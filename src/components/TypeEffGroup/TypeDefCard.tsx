import { Chip } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "../../colors";
import { TYPE_DATA } from "../../typeData";
import { CapitalizeFirstLetter } from "../../utilities/stringManipulation";
import TypeDot from "../TypeDot";
import TypeRow from "./TypeRow";

const DefCardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.card};
  overflow: hidden;
`
const DefCardHeading = styled.div`
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
`

const DefCardContent = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

`

const TypeDefCard = (props: any) => {

  const { type, effGroup, pokemonName } = props;

  if (!type) return <></>

  return (
    <DefCardContainer>
      <DefCardHeading style={{background: TYPE_DATA[type.name].color}}>
        <Chip label={`When defending against a ${CapitalizeFirstLetter(pokemonName)}`} style={{background: COLORS.card}} />
        <TypeDot type={type.name} />
      </DefCardHeading>
      <DefCardContent>
        <TypeRow num='0' types={effGroup.immune} />
        <TypeRow num='½' types={effGroup.weak} />
        <TypeRow num='2' types={effGroup.strong} />
      </DefCardContent>
    </DefCardContainer>
  )
}

export default TypeDefCard
