import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import logger from 'redux-logger'

export default configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    //     devTools: import.meta.env.NODE_ENV !== 'production',
})
