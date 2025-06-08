
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppStatusState, HeroSize } from './appStatusInterfaces'
import { CustomMoveData } from '../../types'


const initialState: AppStatusState = {
  selectedPokemon: undefined,
	selectedVariant: undefined,
  selectedMove: undefined,
  selectedTabIndex: 0,
	selectionHistory: [],
  heroSize: 'default',
  typeGridHoverX: '',
  typeGridHoverY: '',
}

const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setSelectedPokemon(state: AppStatusState, action: PayloadAction<number>) {
			const speciesId = action.payload
      state.selectedPokemon = speciesId
			console.log('#> setSelectedPokemon', speciesId)
			addIdToHistory(state, speciesId)
    },
		setSelectedVariant(state: AppStatusState, action: PayloadAction<number | undefined>) {
			state.selectedVariant = action.payload
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

const addIdToHistory = (state: AppStatusState, speciesId: number) => {
	const newHistory = state.selectionHistory?.filter(p => p !== speciesId)
	newHistory.unshift(speciesId)
	if (newHistory.length > 9) newHistory.pop()
	state.selectionHistory = newHistory
}

export const { 
  setSelectedPokemon, 
	setSelectedVariant,
  setSelectedMove,
  setSelectedTabIndex, 
  setHeroSize, 
  setTypeGridHover 
} = appStatusSlice.actions
export const { name, actions, reducer } = appStatusSlice