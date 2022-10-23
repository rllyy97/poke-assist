
import { createSlice } from '@reduxjs/toolkit'
import { AppStatusState } from './appStatusInterfaces'


const initialState: AppStatusState = {
  selectedPokemon: undefined,
  selectedTabIndex: 0,
  typeGridHoverX: '',
  typeGridHoverY: '',
}

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setSelectedPokemon(state: AppStatusState, action: any) {
      state.selectedPokemon = action.payload
    },
    setSelectedTabIndex(state: AppStatusState, action: any) {
      state.selectedTabIndex = action.payload
    },
    setTypeGridHover(state: AppStatusState, action: any) { 
      state.typeGridHoverX = action.payload.x
      state.typeGridHoverY = action.payload.y
    },
  }
})

export const { setSelectedPokemon, setSelectedTabIndex, setTypeGridHover } = appStatusSlice.actions
export const { name, actions, reducer } = appStatusSlice