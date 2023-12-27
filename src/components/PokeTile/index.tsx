import { PokemonSpecies } from "pokenode-ts"
import { useDispatch } from "react-redux"
import { setSelectedPokemon } from "../../store/appStatus/appStatusSlice"
import { SpriteUrlFromId } from "../../utilities/stringManipulation"
import styled from "styled-components"
import { COLORS } from "../../colors"
import { useSpecies } from "../../hooks/query"

const PokeTileDiv = styled('div')`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.cardHover};
  }

  & > img {
    width: 100%;
    height: 100%;t
  }
`

export interface PokeTileProps {
  name?: string
  onClick?: () => void
}

const PokeTile = ({ name, onClick }: PokeTileProps) => {

  const speciesByName = useSpecies(name)

  const pokemon = speciesByName?.data

  if (!pokemon) return <></>

  return(
    <PokeTileDiv onClick={onClick}>
      <img alt={pokemon.name} src={SpriteUrlFromId(pokemon.id)} />
    </PokeTileDiv>
  )
}

export default PokeTile