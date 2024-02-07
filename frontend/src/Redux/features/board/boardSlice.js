import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        boardList: []
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
            let targetBoard = state.boardList.filter(board => board.id === editedBoard.id)[0]
            targetBoard = editedBoard
        },
        deleteBoard: (state, action) => {
            const deletedBoard = action.payload
            const boardIndex = state.boardList.map(board => board.id).indexOf(deletedBoard.id)
            state.boardList.splice(boardIndex, 1)
        }
    }
})

export const { setBoardList, addBoard, editBoard, deleteBoard } = boardSlice.actions

export default boardSlice.reducer
