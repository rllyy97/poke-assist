import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useTypeGridHoverX, useTypeGridHoverY } from "../../store/appStatus/appStatusSelectors"
import { setTypeGridHover } from "../../store/appStatus/appStatusSlice"
import { TYPE_DATA } from "../../typeData"
import TypeDot from "../TypeDot"
import { EffDotContainer, TypeGridContainer, TypeRowContainer } from "./styles"
import TypeRow from "./typeRow"

const CELL_SIZE = 24

const TypeGrid = () => {

  const dispatch = useDispatch();

  const hoverX = useTypeGridHoverX()
  const hoverY = useTypeGridHoverY()
  
  const hoverCallback = useCallback((x?: string, y?: string) => {
    dispatch(setTypeGridHover({ x, y }))
  }, [dispatch])

  const typeKeys = Object.keys(TYPE_DATA)
  const hoverXIndex = hoverX ? typeKeys.indexOf(hoverX) : -1
  const hoverYIndex = hoverY ? typeKeys.indexOf(hoverY) : -1

  return (
    <TypeGridContainer>
      <TypeRowContainer>
        <EffDotContainer />
        {
          typeKeys.map((type) => (
            <EffDotContainer
              key={type}
              onMouseEnter={() => hoverCallback(undefined, type)}
              onMouseLeave={() => hoverCallback(undefined, undefined)}
            >
              <TypeDot type={type} size="small" variant="square" />
            </EffDotContainer>
          ))
        }
      </TypeRowContainer>
      {
        typeKeys.map((type) => <TypeRow key={type} typeName={type} hoverCallback={hoverCallback} />)
      }
      {hoverXIndex >= 0 && (
        <div style={{
          position: 'absolute',
          top: (hoverXIndex + 1) * CELL_SIZE,
          left: 0,
          right: 0,
          height: CELL_SIZE,
          outline: `2px solid ${TYPE_DATA[hoverX]?.color}`,
          pointerEvents: 'none',
          zIndex: 1,
          outlineOffset: '-1px',
          borderRadius: '6px',
        }} />
      )}
      {hoverYIndex >= 0 && (
        <div style={{
          position: 'absolute',
          left: (hoverYIndex + 1) * CELL_SIZE,
          top: 0,
          bottom: 0,
          width: CELL_SIZE,
          outline: `2px solid ${TYPE_DATA[hoverY]?.color}`,
          pointerEvents: 'none',
          zIndex: 1,
          outlineOffset: '-1px',
          borderRadius: '6px',

        }} />
      )}
    </TypeGridContainer>
  )

}

export default TypeGrid;
