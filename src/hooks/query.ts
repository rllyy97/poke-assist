import { useQuery } from "react-query";
import { useApi } from "../store/api/apiSelectors";


export const useSpecies = (name: string) => {
  const api = useApi()
  return useQuery(["species", name], () => api.pokemon.getPokemonSpeciesByName(name), {
    enabled: !!name,
  })
}

export const usePokemon = (name: string) => {
  const api = useApi()
  return useQuery(["pokemon", name], () => api.pokemon.getPokemonByName(name), {
    enabled: !!name,
  })
}
