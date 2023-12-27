
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppStatusState, HeroSize } from './appStatusInterfaces'
import { CustomMoveData } from '../../types'

const initialState: AppStatusState = {
  selectedPokemon: undefined,
  selectedVariant: undefined,
  pokemonHistory: [],
  selectedTabIndex: 0,
  selectedMove: undefined,
  heroSize: 'default',
  typeGridHoverX: '',
  typeGridHoverY: '',
}

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setSelectedPokemon(state: AppStatusState, action: PayloadAction<string | undefined>) {
      state.selectedPokemon = action.payload
      // Shift history
      const newHistory = state.pokemonHistory?.filter(name => name !== action.payload)
      newHistory.unshift(action.payload)
      if (newHistory.length > 9) newHistory.pop()
      state.pokemonHistory = newHistory
    },
    setSelectedVariant(state: AppStatusState, action: PayloadAction<string | undefined>) {
      state.selectedVariant = action.payload
    },
    setSelectedTabIndex(state: AppStatusState, action: PayloadAction<number>) {
      state.selectedTabIndex = action.payload
    },
    setSelectedMove(state: AppStatusState, action: PayloadAction<CustomMoveData | undefined>) {
      state.selectedMove = action.payload
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
  setSelectedVariant,
  setSelectedTabIndex,
  setSelectedMove,
  setHeroSize,
  setTypeGridHover
} = appStatusSlice.actions
export const { name, actions, reducer } = appStatusSlice