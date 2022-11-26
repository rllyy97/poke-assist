
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { TYPE_DATA } from "../../typeData"
import { AppState } from "../store"

const getPokemonHistoryData = (state: AppState) => state.pokemonHistory
const getCurrentPokemon = createSelector(getPokemonHistoryData, data => data.history[0])
const getPokemonHistory = createSelector(getPokemonHistoryData, data => data.history)
const getCurrentPokemonVariant = createSelector(getPokemonHistoryData, data => data.variant)

export const useCurrentPokemon = () => useSelector(getCurrentPokemon)
export const usePokemonHistory = () => useSelector(getPokemonHistory)
export const useCurrentPokemonVariant = () => useSelector(getCurrentPokemonVariant)

export const usePrimaryColor = () =>
  TYPE_DATA[useCurrentPokemonVariant()?.types?.[0].type.name]?.color ?? 'grey'