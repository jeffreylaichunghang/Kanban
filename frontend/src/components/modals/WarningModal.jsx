import { useContext, useEffect } from "react";
import { ThemeContext } from "../../themes";
import { useSelector, useDispatch } from "react-redux";
import useApiCall from "../../hooks/useApiCall";

import Modal from ".";
import Text from "../Text";
import Button from "../Button";
import { setTaskdata } from "../../Redux/features/task/taskSlice";
import { removeTask } from "../../Redux/features/columns/columnSlice";
import { deleteBoard } from "../../Redux/features/board/boardSlice";
import { setColumnList } from "../../Redux/features/columns/columnSlice";

export default function WarningModal({
    warningModal,
    setWarningModal,
    board,
    setBoard,
}) {
    const activeTask = useSelector(state => state.task.activeTask)
    const boardList = useSelector(state => state.board.boardList)
    const dispatch = useDispatch()
    const { loading, error, value: deletedboard, callApi: deleteboard } = useApiCall(`deleteBoard/${board?.id}`, 'DELETE')
    const { value: deletedTask, callApi: deleteTask } = useApiCall(`deleteTask/${activeTask?.id}`, 'DELETE')
    const { theme } = useContext(ThemeContext)

    useEffect(() => {
        if (deletedboard) {
            dispatch(deleteBoard(deletedboard))
            const remainingBoard = boardList.filter(board => board.id !== deletedboard.id)
            if (remainingBoard.length > 0) {
                setBoard(remainingBoard[0])
                dispatch(setColumnList(remainingBoard[0].columns))
            } else {
                setBoard(null)
                dispatch(setColumnList([]))
            }
        }
        setWarningModal({ show: false })
    }, [deletedboard])

    useEffect(() => {
        if (deletedTask) {
            console.log(deletedTask)
            dispatch(setTaskdata(null))
            dispatch(removeTask(deletedTask))
        }
        setWarningModal({ show: false })
    }, [deletedTask])

    let target = {
        type: '',
        message: ''
    };
    if (warningModal.show) {
        switch (warningModal.target) {
            case 'board':
                target.type = 'board',
                    target.message = `Are you sure you want to delete the ‘${board.board_name}’ board? This action will remove all columns and tasks and cannot be reversed.`
                break;
            case 'task':
                target.type = 'task',
                    target.message = `Are you sure you want to delete the ‘${activeTask?.task_name}’ task? This action will remove all subtasks and cannot be reversed.`
                break;

            default:
                break;
        }
    }

    return (
        <Modal
            modal={warningModal.show}
            action={() => setWarningModal({ show: false })}
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
                text={`Delete this ${target.type}?`}
                color={theme.color.destructive}
            />
            <Text
                variant="body"
                size="l"
                text={`${target.message}`}
                color={theme.color.secondaryText}
            />
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    columnGap: 16
                }}
            >
                <Button
                    text="Delete"
                    variant="destructive"
                    style={{
                        width: '100%'
                    }}
                    onClick={() => {
                        if (target.type === 'board') {
                            deleteboard()
                        } else if (target.type === 'task') {
                            deleteTask()
                        }
                    }}
                />
                <Button
                    text="Cancel"
                    variant="secondary"
                    style={{
                        width: '100%'
                    }}
                    onClick={() => setWarningModal({ show: false })}
                />
            </div>
        </Modal>
    )
}
