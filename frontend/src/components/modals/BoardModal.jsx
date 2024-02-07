import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../themes";
import useApiCall from "../../hooks/useApiCall";
import { useDispatch, useSelector } from "react-redux";

import Modal from ".";
import Text from "../Text";
import Input from "../Input";
import InputItem from "../InputItem";
import Label from "../Label";
import Button from "../Button";
import { constants } from "../../constants/constants";
import { addBoard, editBoard } from "../../Redux/features/board/boardSlice";
import { setColumnList } from "../../Redux/features/columns/columnSlice";

export default function BoardModal({
    board,
    setBoard,
    modal,
    setModal,
}) {
    const boardList = useSelector(state => state.board.boardList)
    const dispatch = useDispatch()
    const { value: createdBoard, callApi: createboard } = useApiCall('createBoard', 'POST')
    const { value: editedBoard, callApi: editboard } = useApiCall(`editBoard/${board?.id}`, 'PUT')
    const [boardInfo, setBoardInfo] = useState(null)
    const { theme } = useContext(ThemeContext)
    const styles = {
        boardColumnList: {
            maxHeight: 170,
            overflowY: 'scroll',
            overflowX: 'none'
        }
    }

    useEffect(() => {
        if (modal === 'newboard') {
            setBoardInfo({
                board_name: '',
                columns: constants.columnSuggestion.slice(0, 2).map(suggestion => ({
                    column_name: suggestion,
                }))
            })
        } else if (modal === 'editboard') {
            setBoardInfo(board)
        }
    }, [board, modal])
    useEffect(() => {
        if (createdBoard) {
            console.log(createdBoard)
            setBoard({
                ...createdBoard.createdBoard,
                columns: createdBoard.createdColumns
            })
            dispatch(addBoard({
                ...createdBoard.createdBoard,
                columns: createdBoard.createdColumns
            }))
            setModal('')
        }
    }, [createdBoard])
    useEffect(() => {
        if (editedBoard) {
            console.log(editedBoard)
            setBoard(editedBoard)
            dispatch(editBoard(editedBoard))
            dispatch(setColumnList(editedBoard.columns))
            setModal('')
        }
    }, [editedBoard])

    const boardColumnList = useMemo(() => {
        return boardInfo?.columns.map((info, index) => {
            return (
                <InputItem
                    key={info.id || `board${board?.id}_col${index}`}
                    name={`col_${index}`}
                    value={info.column_name}
                    onClick={() => setBoardInfo(prev => ({
                        ...prev,
                        columns: prev.columns.toSpliced(index, 1)
                    }))}
                    onChange={(e) => setBoardInfo(prev => ({
                        ...prev,
                        columns: prev.columns.toSpliced(index, 1, {
                            ...prev.columns[index],
                            column_name: e.target.value
                        })
                    }))}
                    validation={info?.validColumnName}
                />
            )
        })
    }, [boardInfo])

    function validateBoardInfo(info) {
        let valid = true
        let infoToValidate = JSON.parse(JSON.stringify(info))

        for (const key in info) {
            const value = info[key]
            let validation = { valid: true, message: '' }

            if (key === 'board_name') {
                if (value === '') {
                    valid = false
                    validation.valid = false
                    validation.message = 'Can \'t be empty'
                } else if (modal === 'newboard' && boardList?.map(board => board.board_name).includes(value)) {
                    valid = false
                    validation.valid = false
                    validation.message = `${value} already exist`
                } else if (
                    modal === 'editboard' &&
                    boardList.map(data => data.board_name).filter(name => name !== board.board_name).includes(value)
                ) {
                    valid = false
                    validation.valid = false
                    validation.message = `${value} already exist`
                }
                infoToValidate.validBoardName = validation
            }
            if (key === 'columns') {
                value.forEach((column, index) => {
                    if (column.column_name === '' || infoToValidate.columns.map(col => col.column_name).indexOf(column.column_name) !== index) {
                        valid = false
                        validation.valid = false
                        validation.message = column.column_name === '' ? 'Can \'t be empty' : 'Duplicated'
                    }
                    infoToValidate.columns[index].validColumnName = validation
                    validation = { valid: true, message: '' }
                })
            }
        }
        setBoardInfo(infoToValidate)
        return valid
    }

    const onsubmit = () => {
        if (!validateBoardInfo(boardInfo)) return
        if (modal === 'newboard') {
            console.log('create board')
            createboard({
                board_name: boardInfo.board_name,
                board_columns: boardInfo.columns
            })
        } else if (modal === 'editboard') {
            console.log('edit board', boardInfo)
            editboard({
                board_name: boardInfo.board_name,
                board_columns: boardInfo.columns
            })
        }
    }

    return (
        <Modal
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                rowGap: 24,
            }}
            modal={modal === 'newboard' || modal === 'editboard'}
            action={() => {
                if (modal === 'newboard' || modal === 'editboard') {
                    setModal('')
                    setBoardInfo(null)
                }
            }}
        >
            <Text
                variant="heading"
                size="l"
                text={modal === 'newboard' ? "Add New Board" : 'Edit Board'}
            />
            <div>
                <Label text="Board Name" name="boardName" />
                <Input
                    name="boardName"
                    value={boardInfo?.board_name}
                    placeholder={modal === 'newboard' ? "e.g. Web Design" : ''}
                    onChange={(e) => setBoardInfo(prev => ({
                        ...prev,
                        board_name: e.target.value
                    }))}
                    validation={boardInfo?.validBoardName}
                />
            </div>
            <div>
                <Label text="Board Columns" name="boardColumn" />
                <div style={styles.boardColumnList}>
                    {boardColumnList}
                </div>
                <Button
                    text="+ Add New Column"
                    variant="secondary"
                    style={{
                        width: '100%',
                        marginTop: 12,
                        padding: 12,
                    }}
                    onClick={() => setBoardInfo(prev => ({
                        ...prev,
                        columns: prev.columns.concat([{
                            column_name: constants.columnSuggestion.filter(sug => !prev.columns.map(col => col.column_name).includes(sug))[0]
                        }])
                    }))}
                />
            </div>
            <Button
                text={modal === 'newboard' ? "Create New Board" : 'Save Changes'}
                variant="primary"
                style={{
                    width: '100%',
                    padding: 12,
                }}
                onClick={onsubmit}
            />
        </Modal>
    )
}
