import { combineReducers } from "redux";

import boardSlice from "./features/board/boardSlice";
import columnReducer from './features/columns/columnSlice'
import taskReducer from './features/task/taskSlice'

const rootReducer = combineReducers({
    task: taskReducer,
    column: columnReducer,
    board: boardSlice
})

export default rootReducer
