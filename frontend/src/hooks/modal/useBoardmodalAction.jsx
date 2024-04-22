import { useEffect, useState } from 'react'
import useApiCall from '../useApiCall'
import { useSelector, useDispatch } from 'react-redux'

import { setCurrentBoard, addBoard, editBoard } from '../../Redux/features/board/boardSlice'
import { setColumnList } from '../../Redux/features/columns/columnSlice'
import { setModal } from '../../Redux/features/modal/modalSlice'
import { constants } from '../../constants/constants'

const useBoardmodalAction = () => {
    const [boardInfo, setBoardInfo] = useState(null)
    const currentBoard = useSelector(state => state.board.currentBoard)
    const modal = useSelector(state => state.modal.value)
    const { value: createdBoard, callApi: createboard } = useApiCall('createBoard', 'POST')
    const { value: editedBoard, callApi: editboard } = useApiCall(`editBoard/${currentBoard?.id}`, 'PUT')
    const dispatch = useDispatch()

    /* update board modal info state */
    useEffect(() => {
        if (modal === 'newboard') {
            setBoardInfo({
                board_name: '',
                columns: constants.columnSuggestion.slice(0, 2).map(suggestion => ({
                    column_name: suggestion,
                }))
            })
        } else if (modal === 'editboard') {
            setBoardInfo(currentBoard)
        }
    }, [currentBoard, modal])

    /* actions from created board */
    useEffect(() => {
        if (createdBoard) {
            console.log(createdBoard)
            dispatch(setCurrentBoard({
                ...createdBoard.createdBoard,
                columns: createdBoard.createdColumns
            }))
            dispatch(addBoard({
                ...createdBoard.createdBoard,
                columns: createdBoard.createdColumns
            }))
            // dispatch(setColumnList(createdBoard.createdColumns))
            dispatch(setModal(''))
        }
    }, [createdBoard])
    /* actions from edited board */
    useEffect(() => {
        if (editedBoard) {
            console.log(editedBoard)
            dispatch(setCurrentBoard(editedBoard))
            dispatch(editBoard(editedBoard))
            dispatch(setColumnList(editedBoard.columns))
            dispatch(setModal(''))
        }
    }, [editedBoard])

    /* form submit action */
    const onsubmit = () => {
        console.log(modal, boardInfo)
        const payload = {
            board_name: boardInfo.board_name,
            board_columns: boardInfo.columns
        }
        modal === 'newboard' ? createboard(payload) : editboard(payload)
    }

    return { boardInfo, setBoardInfo, onsubmit }
}

export default useBoardmodalAction
