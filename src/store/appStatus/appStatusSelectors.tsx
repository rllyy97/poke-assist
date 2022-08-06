
import { createSelector } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import { AppState } from "../store"
import { AppStatusState } from "./appStatusInterfaces"

export const getAppStatusData = (state: AppState) => state.appStatus

export const getSelectedPokemonName = createSelector(getAppStatusData, data => data.selectedPokemon)
export const getTypeGridHoverX = createSelector(getAppStatusData, data => data.typeGridHoverX)
export const getTypeGridHoverY = createSelector(getAppStatusData, data => data.typeGridHoverY)

export const useIsTypeHovered = (typeNameX: string, typeNameY: string) => (
  useSelector(createSelector(getAppStatusData, (state: AppStatusState) => (
    state.typeGridHoverX === typeNameX || state.typeGridHoverY === typeNameY
  )))
)
