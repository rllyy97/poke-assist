
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"
import { AppStatusState } from "./appStatusInterfaces"

export const getAppStatusData = (state: AppState) => state.appStatus

export const useSelectedPokemonName = () => useSelector(createSelector(getAppStatusData, data => data.selectedPokemon))
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
