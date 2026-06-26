
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"
import { apiClient } from "./apiSlice"

const getApiData = (state: AppState) => state.api
const getApiStatus = createSelector(getApiData, data => data.status)

export const useApi = () => apiClient
export const useApiStatus = () => useSelector(getApiStatus)
