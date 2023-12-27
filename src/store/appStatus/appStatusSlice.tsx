
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppStatusState, HeroSize } from './appStatusInterfaces'
import { CustomMoveData } from '../../types'


const initialState: AppStatusState = {
  selectedPokemon: undefined,
  selectedMove: undefined,
  selectedTabIndex: 0,
  heroSize: 'default',
  typeGridHoverX: '',
  typeGridHoverY: '',
}

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setSelectedPokemon(state: AppStatusState, action: PayloadAction<string>) {
      state.selectedPokemon = action.payload
    },
    setSelectedMove(state: AppStatusState, action: PayloadAction<CustomMoveData>) {
      state.selectedMove = action.payload
    },
    setSelectedTabIndex(state: AppStatusState, action: PayloadAction<number>) {
      state.selectedTabIndex = action.payload
    },
    setTypeGridHover(state: AppStatusState, action: PayloadAction<{x: string, y: string}>) { 
      state.typeGridHoverX = action.payload.x
      state.typeGridHoverY = action.payload.y
    },
    setHeroSize(state: AppStatusState, action: PayloadAction<HeroSize>) {
      state.heroSize = action.payload
    }
  }
})

export const { 
  setSelectedPokemon, 
  setSelectedMove,
  setSelectedTabIndex, 
  setHeroSize, 
  setTypeGridHover 
} = appStatusSlice.actions
export const { name, actions, reducer } = appStatusSlice