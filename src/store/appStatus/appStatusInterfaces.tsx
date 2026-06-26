import { CustomMoveData } from "../../types"

export interface AppStatusState {
  selectedPokemon: number | undefined
	selectedVariant: number | undefined
  selectedMove: CustomMoveData | undefined
  selectedTabIndex: number
	selectionHistory: number[]
  typeGridHoverX: string
  typeGridHoverY: string
}
