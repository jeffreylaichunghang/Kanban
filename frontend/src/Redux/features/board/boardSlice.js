import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        boardList: [],
        currentBoard: null
    },
    reducers: {
        setBoardList: (state, action) => {
            state.boardList = action.payload
        },
        addBoard: (state, action) => {
            state.boardList.push(action.payload)
        },
        editBoard: (state, action) => {
            const editedBoard = action.payload
            let targetIndex;
            let targetBoard = state.boardList.filter((board, index) => {
                targetIndex = index
                return board.id === editedBoard.id
            })[0]
            targetBoard = editedBoard
            state.boardList.splice(targetIndex, 1, targetBoard)
        },
        deleteBoard: (state, action) => {
            if (state.boardList.length <= 0) return
            const deletedBoard = action.payload
            const boardIndex = state.boardList.map(board => board.id).indexOf(deletedBoard.id)
            state.boardList.splice(boardIndex, 1)
        },
        setCurrentBoard: (state, action) => {
            state.currentBoard = action.payload
        }
    }
})

export const {
    setBoardList,
    addBoard,
    editBoard,
    deleteBoard,
    setCurrentBoard
} = boardSlice.actions

export default boardSlice.reducer
