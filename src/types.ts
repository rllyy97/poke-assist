import { Move, PokemonMoveVersion } from "pokenode-ts"

export const TYPE_EFF: Record<string, string> = {
  REGULAR: 'REGULAR',
  STRONG: 'STRONG',
  WEAK: 'WEAK',
  IMMUNE: 'IMMUNE',
}

export type TypeEffectiveness = keyof typeof TYPE_EFF

export interface CustomMoveData {
  name: string
  versionGroupDetails?: PokemonMoveVersion
  machineName?: string
  data?: Move
}
