import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypeGridHoverX, getTypeGridHoverY } from "../../store/appStatus/appStatusSelectors";
import { setTypeGridHover } from "../../store/appStatus/appStatusSlice";
import { TYPE_DATA } from "../../typeData";
import TypeDot from "../TypeDot";
import { EffDotContainer, TypeGridContainer, TypeRowContainer } from "./styles";
import TypeRow from "./typeRow";

const TypeGrid = () => {

  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hoverX = useSelector(getTypeGridHoverX);
  const hoverY = useSelector(getTypeGridHoverY);
  
  const hoverCallback = useCallback((x?: string, y?: string) => {
    dispatch(setTypeGridHover({ x, y }))
  }, [dispatch])

  return (
    <TypeGridContainer>
      <TypeRowContainer>
        <EffDotContainer />
        {
          Object.keys(TYPE_DATA).map((type) => (
            <EffDotContainer
              key={type}
              onMouseEnter={() => hoverCallback(undefined, type)}
              onMouseLeave={() => hoverCallback(undefined, undefined)}
              hover={hoverY === type}
              typeColorY={hoverY === type && TYPE_DATA[hoverY]?.color}
            >
              <TypeDot type={type} size="small" />
            </EffDotContainer>
          ))
        }
      </TypeRowContainer>
      {
        Object.keys(TYPE_DATA).map((type) => <TypeRow key={type} typeName={type} hoverCallback={hoverCallback} />)
      }
    </TypeGridContainer>
  )

}

export default TypeGrid;