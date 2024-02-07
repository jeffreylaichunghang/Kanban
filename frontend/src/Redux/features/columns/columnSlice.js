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
            targetColumn.tasks.push(newTask)
        },
        removeTask: (state, action) => {
            const deletedTask = action.payload
            const targetColumn = state.columnList.filter(col => col.id === deletedTask.columnId)[0]
            const taskIndex = targetColumn.tasks.map(task => task.id).indexOf(deletedTask.id)
            console.log(taskIndex)
            targetColumn.tasks.splice(taskIndex, 1)
        }
    }
})

export const { setColumnList, moveTaskAcrossColumns, addNewTask, removeTask } = columnSlice.actions

export default columnSlice.reducer
