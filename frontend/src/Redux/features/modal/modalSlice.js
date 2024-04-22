import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        value: null
    },
    reducers: {
        setModal: (state, action) => {
            state.value = action.payload
        },
        closeModal: (state) => {
            state.value = ''
        }
    }
})

export const {
    setModal,
    closeModal
} = modalSlice.actions

export default modalSlice.reducer
