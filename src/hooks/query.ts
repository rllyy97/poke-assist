import { useQuery } from "react-query";
import { useApi } from "../store/api/apiSelectors";
import { useSelectedPokemonId, useSelectedVariantId } from "../store/appStatus/appStatusSelectors";


export const usePokemonVariant = (id: number) => {
  const api = useApi()
  return useQuery(["pokemonVariant", id], () => api.pokemon.getPokemonById(id), {
    enabled: !!id,
  })
}

export const usePokemonSpecies = (id: number) => {
	const api = useApi()
	return useQuery(["pokemonSpecies", id], () => api.pokemon.getPokemonSpeciesById(id), {
		enabled: !!id,
	})
}

export const useCurrentPokemonSpecies = () => {
	const api = useApi()
	const selectedPokemon = useSelectedPokemonId();
	return usePokemonSpecies(selectedPokemon)
}

export const useCurrentPokemonVariant = () => {
	const api = useApi()
	const selectedVariant = useSelectedVariantId();
	return usePokemonVariant(selectedVariant)
}

export const useAbility = (id: number) => {
	const api = useApi()
	return useQuery(["ability", id], () => api.pokemon.getAbilityById(id), {
		enabled: !!id,
	})
}
