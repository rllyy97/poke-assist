
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { reducer as appStatusReducer } from "./appStatus/appStatusSlice"
import { reducer as apiReducer } from "./api/apiSlice"
import { reducer as pokemonHistoryReducer } from "./pokemonHistory/pokemonHistorySlice"

const reducer = combineReducers({
    appStatus: appStatusReducer,
    api: apiReducer,
    pokemonHistory: pokemonHistoryReducer
})

export const store = configureStore({
    reducer,
    devTools: true,
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch