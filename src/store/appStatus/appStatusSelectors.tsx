
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"
import { AppStatusState } from "./appStatusInterfaces"
import { useSpecies, usePokemon } from "../../hooks/query"
import { TYPE_DATA } from "../../typeData"

export const getAppStatusData = (state: AppState) => state.appStatus

export const useSelectedPokemonName = () => useSelector(createSelector(getAppStatusData, data => data.selectedPokemon))
export const useSelectedVariantName = () => useSelector(createSelector(getAppStatusData, data => data.selectedVariant))
export const usePokemonHistory = () => useSelector(createSelector(getAppStatusData, data => data.pokemonHistory))
export const useSelectedTabIndex = () => useSelector(createSelector(getAppStatusData, data => data.selectedTabIndex))
export const useSelectedMove = () => useSelector(createSelector(getAppStatusData, data => data.selectedMove))
export const useTypeGridHoverX = () => useSelector(createSelector(getAppStatusData, data => data.typeGridHoverX))
export const useTypeGridHoverY = () => useSelector(createSelector(getAppStatusData, data => data.typeGridHoverY))

export const useHeroSize = () => useSelector(createSelector(getAppStatusData, data => data.heroSize))

export const useIsTypeHovered = (typeNameX: string, typeNameY: string) => (
  useSelector(createSelector(getAppStatusData, (state: AppStatusState) => (
    state.typeGridHoverX === typeNameX || state.typeGridHoverY === typeNameY
  )))
)

export const usePrimaryColor = () => {
  const pokemon = useSelectedPokemon().data
  return TYPE_DATA[pokemon?.types?.[0].type.name]?.color ?? 'grey'
}

export const useSelectedSpecies = () => {
  const selectedPokemonName = useSelectedPokemonName()
  return useSpecies(selectedPokemonName)
}

export const useSelectedPokemon = () => {
  const selectedVariantName = useSelectedVariantName()
  return usePokemon(selectedVariantName)
}
