
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"

const getApiData = (state: AppState) => state.api
const getApi = createSelector(getApiData, data => data.api)
const getApiStatus = createSelector(getApiData, data => data.status)

export const useApi = () => useSelector(getApi)
export const useApiStatus = () => useSelector(getApiStatus)