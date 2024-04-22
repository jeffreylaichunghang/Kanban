import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import useBoardmodalAction from "../../hooks/modal/useBoardmodalAction";

import Modal from ".";
import Text from "../Text";
import Input from "../Input";
import InputItem from "../InputItem";
import Label from "../Label";
import Button from "../Button";
import { constants } from "../../constants/constants";
import { setModal } from "../../Redux/features/modal/modalSlice";
import checkDuplicate from "../../utils/checkDuplicate";

export default function BoardModal() {
    const { register, handleSubmit, clearErrors, formState: { errors }, resetField } = useForm()
    const { boardInfo, setBoardInfo, onsubmit } = useBoardmodalAction()
    const { boardList, currentBoard } = useSelector(state => state.board)
    const modal = useSelector(state => state.modal.value)
    const dispatch = useDispatch()
    const styles = {
        boardColumnList: {
            maxHeight: 170,
            overflowY: 'scroll',
            overflowX: 'none'
        }
    }

    const columnNameList = boardInfo?.columns.map(col => col.column_name)
    const columnsValidation = {
        'newboard': (value) => checkDuplicate(columnNameList, value) ? 'already exist' : true,
        'editboard': (value) => columnNameList?.filter(col => col === value).length > 1 ? 'already exist' : true,
    }
    const boardNameList = boardList?.map(board => board.board_name)
    const validBoardName = {
        'newboard': value => !boardNameList.includes(value) || 'already exist',
        'editboard': value => boardNameList.filter(board => board !== currentBoard.board_name).includes(value) ? 'already exist' : true
    }
    const boardColumnList = boardInfo?.columns.map((info, index) => {
        // TODO: add ref to InputItem and apply scrollIntoView() when the user adds an inputitem
        let validatedColumn;
        if (errors[`columns`]) validatedColumn = errors[`columns`][index]
        return (
            <InputItem
                key={info.id || `board${currentBoard?.id}_col${index}`}
                name={`col_${index}`}
                value={info.column_name}
                onClick={() => setBoardInfo(prev => ({
                    ...prev,
                    columns: prev.columns.toSpliced(index, 1)
                }))}
                validation={validatedColumn}
                {...register(`columns.${index}`, {
                    value: info.column_name,
                    required: 'column name required',
                    validate: columnsValidation[modal],
                    onChange: (e) => {
                        setBoardInfo(prev => ({
                            ...prev,
                            columns: prev.columns.toSpliced(index, 1, {
                                ...prev.columns[index],
                                column_name: e.target.value
                            })
                        }))
                        clearErrors(`col_${index}`)
                    }
                })}
            />
        )
    })

    return (
        <Modal
            modal={modal === 'newboard' || modal === 'editboard'}
            action={() => {
                if (modal === 'newboard' || modal === 'editboard') {
                    dispatch(setModal(''))
                    setBoardInfo(null)
                    clearErrors()
                    resetField('boardName')
                }
            }}
        >
            <form
                onSubmit={handleSubmit(onsubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    rowGap: 24,
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
                        validation={errors['boardName']}
                        {...register('boardName', {
                            value: boardInfo?.board_name,
                            required: 'board name required',
                            onChange: (e) => {
                                setBoardInfo(prev => ({
                                    ...prev,
                                    board_name: e.target.value
                                }))
                                clearErrors('boardName')
                            },
                            validate: (value) => validBoardName[modal](value)
                        })}
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
                    type="submit"
                />
            </form>
        </Modal>
    )
}
