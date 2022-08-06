
import { createSlice } from '@reduxjs/toolkit'
import { AppStatusState } from './appStatusInterfaces'


const initialState: AppStatusState = {
  selectedPokemon: undefined,
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
    setSelectedPokemon(state: AppStatusState, action: any) {
      state.selectedPokemon = action.payload
    }
  }
})

export const { setTypeGridHover,setSelectedPokemon } = appStatusSlice.actions
export const { name, actions, reducer } = appStatusSlice