import { CustomMoveData } from "../../types"

export interface AppStatusState {
  selectedPokemon: string | undefined
  selectedVariant: string | undefined
  pokemonHistory: string[]
  selectedTabIndex: number
  selectedMove: CustomMoveData | undefined
  heroSize: HeroSize
  typeGridHoverX: string
  typeGridHoverY: string
}

export type HeroSize = 'default' | 'small'
