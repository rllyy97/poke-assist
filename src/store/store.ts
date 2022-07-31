
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { reducer as appStatusReducer } from "./appStatus/appStatusSlice"

const reducer = combineReducers({
    appStatus: appStatusReducer,
})

export const store = configureStore({
    reducer,
    devTools: true,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch