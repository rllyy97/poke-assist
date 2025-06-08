import styled from "styled-components"
import { COLORS } from "../../colors"
import { useDispatch } from "react-redux"
import { usePokemonHistory } from "../../store/appStatus/appStatusSelectors"
import { setSelectedPokemon } from "../../store/appStatus/appStatusSlice"
import { SpriteUrlFromId } from "../../utilities/stringManipulation"


export const HistoryContainer = styled('div')`
  z-index: 10;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  background: ${COLORS.card};
  border-top: 1px solid ${COLORS.border};
  padding: 8px;
  overflow-x: auto;
`

export const HistoryTile = styled('div')`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${COLORS.background};
  }

  & > img {
    width: 100%;
    height: 100%;t
  }
`

export const HistoryTiles = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: left;
  width: fit-content;
  margin: 0px auto;
`

const PokeHistory = () => {

  const dispatch = useDispatch()
  const speciesIdHistory = usePokemonHistory()

  if (speciesIdHistory.length <= 1) return <></>

  return (
    <HistoryContainer>
      <HistoryTiles>
        {speciesIdHistory?.slice(1, speciesIdHistory.length)?.map((p) => (
          <HistoryTile key={p} onClick={() => dispatch(setSelectedPokemon(p))}>
            <img alt={p.toString()} src={SpriteUrlFromId(p)} />
          </HistoryTile>
        ))}
      </HistoryTiles>
    </HistoryContainer>
  )
}

export default PokeHistory
