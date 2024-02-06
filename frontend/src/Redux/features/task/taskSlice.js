import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'taskdata',
    initialState: {
        activeTask: null
    },
    reducers: {
        setTaskdata: (state, action) => {
            state.activeTask = action.payload
        },
    }
})

export const { setTaskdata } = taskSlice.actions

export default taskSlice.reducer
