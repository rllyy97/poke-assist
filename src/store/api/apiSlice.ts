
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { MainClient } from 'pokenode-ts'
import { ApiState, ApiStatus } from './apiInterfaces'


const initialState: ApiState = {
  api: new MainClient(),
  status: 'disconnected'
}

const apiSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setApi(state: ApiState, action: any) {
      state.api = action.payload
    },
    setApiStatus(state: ApiState, action: PayloadAction<ApiStatus>) {
      state.status = action.payload
    }
  }
})

export const { setApi, setApiStatus } = apiSlice.actions
export const { name, actions, reducer } = apiSlice