import { useDispatch } from "react-redux"
import { usePokemonHistory } from "../../store/appStatus/appStatusSelectors"
import { HistoryContainer, HistoryTiles } from "../../styles"
import PokeTile from "../PokeTile"
import { setSelectedPokemon } from "../../store/appStatus/appStatusSlice"


const SpeciesHistory = () => {
  const dispatch = useDispatch()
  const pokemonHistory = usePokemonHistory()

  return (
    <HistoryContainer>
      <HistoryTiles>
        {pokemonHistory?.slice(1, pokemonHistory.length)?.map((p, i) => (
          <PokeTile 
            name={p}
            key={i}
            onClick={() => dispatch(setSelectedPokemon(p))}
          />
        ))}
      </HistoryTiles>
    </HistoryContainer>
  )
}

export default SpeciesHistory
