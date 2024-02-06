import { createSlice } from "@reduxjs/toolkit";

export const columnSlice = createSlice({
    name: 'column',
    initialState: {
        columnList: null
    },
    reducers: {
        setColumnList: (state, action) => {
            state.columnList = action.payload
        },
        moveTaskAcrossColumns: (state, action) => {
            const { task, columnId } = action.payload
            state.columnList.forEach(column => {
                if (columnId === column.id) {
                    column.tasks = column.tasks.filter(t => t.id !== task.id)
                }
                if (task.columnId === column.id) {
                    column.tasks.push(task)
                }
            });
        },
        addNewTask: (state, action) => {
            const newTask = action.payload
            console.log(newTask)
            const targetColumn = state.columnList.filter(col => col.id === newTask.columnId)[0]
            console.log(targetColumn)
            targetColumn.tasks.push(newTask)
        }
    }
})

export const { setColumnList, moveTaskAcrossColumns, addNewTask } = columnSlice.actions

export default columnSlice.reducer
