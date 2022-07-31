
import { createSlice } from '@reduxjs/toolkit'
import { AppStatusState } from './appStatusInterfaces'


const initialState: AppStatusState = {
  typeGridHoverX: '',
  typeGridHoverY: '',
}

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setTypeGridHover(state: AppStatusState, action: any) { 
      state.typeGridHoverX = action.payload.x
      state.typeGridHoverY = action.payload.y
    },
  }
})

export const { setTypeGridHover } = appStatusSlice.actions
export const { name, actions, reducer } = appStatusSlice