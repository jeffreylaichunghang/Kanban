import { combineReducers } from "redux";

import boardSlice from "./features/board/boardSlice";
import columnReducer from './features/columns/columnSlice'
import taskReducer from './features/task/taskSlice'
import modalSlice from "./features/modal/modalSlice";

const rootReducer = combineReducers({
    task: taskReducer,
    column: columnReducer,
    board: boardSlice,
    modal: modalSlice
})

export default rootReducer
