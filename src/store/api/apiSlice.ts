
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MainClient } from 'pokenode-ts'
import { ApiState, ApiStatus } from './apiInterfaces'

// Singleton client - not stored in Redux (non-serializable)
export const apiClient = new MainClient()

const initialState: ApiState = {
  status: 'disconnected'
}

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setApiStatus(state: ApiState, action: PayloadAction<ApiStatus>) {
      state.status = action.payload
    }
  }
})

export const { setApiStatus } = apiSlice.actions
export const { name, actions, reducer } = apiSlice