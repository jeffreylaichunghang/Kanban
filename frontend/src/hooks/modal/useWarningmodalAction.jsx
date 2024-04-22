import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useApiCall from '../useApiCall'

import { deleteBoard, setCurrentBoard } from '../../Redux/features/board/boardSlice'
import { removeTask, setColumnList } from '../../Redux/features/columns/columnSlice'
import { setTaskdata } from '../../Redux/features/task/taskSlice'
import { setModal } from '../../Redux/features/modal/modalSlice'

const useWarningmodalAction = () => {
    const activeTask = useSelector(state => state.task.activeTask)
    const { boardList, currentBoard } = useSelector(state => state.board)
    const { loading, error, value: deletedboard, callApi: deleteboard } = useApiCall(`deleteBoard/${currentBoard?.id}`, 'DELETE')
    const { value: deletedTask, callApi: deleteTask } = useApiCall(`deleteTask/${activeTask?.id}`, 'DELETE')
    const dispatch = useDispatch()

    useEffect(() => {
        if (deletedboard) {
            dispatch(deleteBoard(deletedboard))
            const remainingBoard = boardList.filter(board => board.id !== deletedboard.id)
            if (remainingBoard.length > 0) {
                dispatch(setCurrentBoard(remainingBoard[0]))
                dispatch(setColumnList(remainingBoard[0].columns))
            } else {
                dispatch(setCurrentBoard(null))
                dispatch(setColumnList([]))
            }
        }
        dispatch(setModal(''))
    }, [deletedboard])

    useEffect(() => {
        if (deletedTask) {
            console.log(deletedTask)
            dispatch(setTaskdata(null))
            dispatch(removeTask(deletedTask))
        }
        dispatch(setModal(''))
    }, [deletedTask])

    return { deleteboard, deleteTask }
}

export default useWarningmodalAction
