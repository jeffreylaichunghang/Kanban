import { combineReducers } from "redux";

import columnReducer from './features/columns/columnSlice'
import taskReducer from './features/task/taskSlice'

const rootReducer = combineReducers({
    task: taskReducer,
    column: columnReducer
})

export default rootReducer
