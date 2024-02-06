import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './features/task/taskSlice'
import columnSlice from './features/columns/columnSlice'

export default configureStore({
    reducer: {
        task: taskSlice,
        column: columnSlice
    },
})
