
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"
import { AppStatusState } from "./appStatusInterfaces"
import { TYPE_DATA } from "../../typeData"
import { useCurrentPokemonVariant } from "../../hooks/query"

export const getAppStatusData = (state: AppState) => state.appStatus

export const useSelectedPokemonId = () => useSelector(createSelector(getAppStatusData, data => data.selectedPokemon))
export const useSelectedVariantId = () => useSelector(createSelector(getAppStatusData, data => data.selectedVariant))
export const useSelectedMove = () => useSelector(createSelector(getAppStatusData, data => data.selectedMove))
export const useSelectedTabIndex = () => useSelector(createSelector(getAppStatusData, data => data.selectedTabIndex))
export const useTypeGridHoverX = () => useSelector(createSelector(getAppStatusData, data => data.typeGridHoverX))
export const useTypeGridHoverY = () => useSelector(createSelector(getAppStatusData, data => data.typeGridHoverY))

export const useHeroSize = () => useSelector(createSelector(getAppStatusData, data => data.heroSize))

export const useIsTypeHovered = (typeNameX: string, typeNameY: string) => (
  useSelector(createSelector(getAppStatusData, (state: AppStatusState) => (
    state.typeGridHoverX === typeNameX || state.typeGridHoverY === typeNameY
  )))
)

export const usePokemonHistory = () => useSelector(createSelector(getAppStatusData, data => data.selectionHistory))

export const usePrimaryColor = () => {
	const { data: variant } = useCurrentPokemonVariant()
  return TYPE_DATA[variant?.types?.[0].type.name]?.color ?? 'grey'
}
