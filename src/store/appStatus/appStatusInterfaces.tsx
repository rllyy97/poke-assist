import { CustomMoveData } from "../../types"

export interface AppStatusState {
  selectedPokemon: number | undefined
	selectedVariant: number | undefined
  selectedMove: CustomMoveData | undefined
  selectedTabIndex: number
	selectionHistory: number[]
  heroSize: HeroSize
  typeGridHoverX: string
  typeGridHoverY: string
}

export type HeroSize = 'default' | 'small'
