
import { createSlice } from '@reduxjs/toolkit'
import { PokemonSpecies } from 'pokenode-ts'
import { PokemonHistoryState } from './pokemonHistoryInterfaces'


const initialState: PokemonHistoryState = {
  history: [],
  variant: undefined
}

const pokemonHistorySlice = createSlice({
  name: 'pokemonHistory',
  initialState,
  reducers: {
    setCurrentPokemon(state: PokemonHistoryState, action: any) {
      const pokemon: PokemonSpecies = action.payload
      const newHistory = state.history?.filter(p => p.name !== pokemon.name)
      newHistory.unshift(pokemon)
      if (newHistory.length > 9) newHistory.pop()
      state.history = newHistory
    },
    setCurrentVariant(state: PokemonHistoryState, action: any) {
      state.variant = action.payload
    }
  }
})

export const { setCurrentPokemon, setCurrentVariant } = pokemonHistorySlice.actions
export const { name, actions, reducer } = pokemonHistorySlice