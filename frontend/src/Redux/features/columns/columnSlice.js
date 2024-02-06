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
        handleTaskDragDrop: (state, action) => {
            const newTasklist = state.columnList
            const { source, destination } = action.payload
            const draggedItem = newTasklist[Number(source.droppableId)].tasks.splice(source.index, 1)
            draggedItem[0].columnId = newTasklist[Number(destination.droppableId)].id
            newTasklist[Number(destination.droppableId)].tasks.splice(destination.index, 0, draggedItem[0])
        }
    }
})

export const { setColumnList, moveTaskAcrossColumns, handleTaskDragDrop } = columnSlice.actions

export default columnSlice.reducer
