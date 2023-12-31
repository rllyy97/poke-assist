import { CustomMoveData } from "../../types"

export interface AppStatusState {
  selectedPokemon: string | undefined
  selectedMove: CustomMoveData | undefined
  selectedTabIndex: number
  heroSize: HeroSize
  typeGridHoverX: string
  typeGridHoverY: string
}

export type HeroSize = 'default' | 'small'
