import { useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../../themes";
import useApiCall from "../../hooks/useApiCall";

import Modal from ".";
import Text from "../Text";
import Input from "../Input";
import InputItem from "../InputItem";
import Label from "../Label";
import Button from "../Button";
import { constants } from "../../constants/constants";

export default function BoardModal({
    board,
    setBoard,
    modal,
    setModal,
    allTaskData,
    getAllBoardsData
}) {
    const { value: createdBoard, callbackMemoized: createboard } = useApiCall('createBoard', 'POST')
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
        if (createdBoard) {
            console.log(createdBoard)
            setBoard({
                ...createdBoard.createdBoard,
                columns: createdBoard.createdColumns
            })
            setModal('')
            getAllBoardsData()
        }
    }, [board, modal, createdBoard])

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
        let infoToValidate = { ...info }

        for (const key in info) {
            const value = info[key]
            let validation = { valid: true, message: '' }

            if (key === 'board_name') {
                if (value === '' || allTaskData?.map(board => board.board_name).includes(value)) {
                    valid = false
                    validation.valid = false
                    validation.message = value === '' ? 'Can \'t be empty' : 'Duplicated'
                }
                infoToValidate.validBoardName = validation
            } else if (key === 'columns') {
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
        console.log(boardInfo)
        createboard({
            board_name: boardInfo.board_name,
            board_columns: boardInfo.columns
        })
    }

    return (
        <Modal
            style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                rowGap: 24,
            }}
            modal={modal}
            action={() => {
                setModal('')
                setBoardInfo(null)
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
