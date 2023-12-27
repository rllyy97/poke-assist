import { Pokemon, PokemonSpecies } from "pokenode-ts";

export interface PokemonHistoryState {
  history: PokemonSpecies[]
  variant: Pokemon | undefined
}