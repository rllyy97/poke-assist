
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Pokemon, PokemonSpecies } from 'pokenode-ts'
import { PokemonHistoryState } from './pokemonHistoryInterfaces'


const initialState: PokemonHistoryState = {
  history: [],
  variant: undefined
}

const pokemonHistorySlice = createSlice({
  name: 'pokemonHistory',
  initialState,
  reducers: {
    setCurrentPokemon(state: PokemonHistoryState, action: PayloadAction<PokemonSpecies>) {
      const pokemon: PokemonSpecies = action.payload
      const newHistory = state.history?.filter(p => p.name !== pokemon.name)
      newHistory.unshift(pokemon)
      if (newHistory.length > 9) newHistory.pop()
      state.history = newHistory
    },
    setCurrentVariant(state: PokemonHistoryState, action: PayloadAction<Pokemon | undefined>) {
      state.variant = action.payload
    }
  }
})

export const { setCurrentPokemon, setCurrentVariant } = pokemonHistorySlice.actions
export const { name, actions, reducer } = pokemonHistorySlice