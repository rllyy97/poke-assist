
import { IdFromPokemonUrl, SpriteUrlFromId } from "../../utilities/stringManipulation"
import styled from "styled-components"
import { COLORS } from "../../colors"

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
  url?: string
  onClick?: () => void
}

const PokeTile = ({ name, url, onClick }: PokeTileProps) => {

  const src = SpriteUrlFromId(IdFromPokemonUrl(url))

  if (!url) return <></>

  return(
    <PokeTileDiv onClick={onClick}>
      <img alt={name} src={src} />
    </PokeTileDiv>
  )
}

export default PokeTile