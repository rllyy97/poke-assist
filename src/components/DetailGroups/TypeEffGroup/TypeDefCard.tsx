import { Chip, Divider } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "../../../colors";
import { TYPE_DATA } from "../../../typeData";
import { CapitalizeFirstLetter } from "../../../utilities/stringManipulation";
import TypeDot from "../../TypeDot";
import TypeRow from "./TypeRow";

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShieldIcon from '@mui/icons-material/Shield';

const MatchupCardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.card};
  overflow: hidden;
`
const MatchupCardHeading = styled.div`
  padding: 6px 14px;
  display: flex;
  gap: 11px;
  align-items: center;
`

const MatchupCardContent = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

`

const TypeDefCard = (props: any) => {

  const { type, effGroup, pokemonName } = props;

  if (!type) return <></>

  return (
    <MatchupCardContainer>
      <MatchupCardHeading style={{background: TYPE_DATA[type.name].color}}>
        <TypeDot type={type.name} />
        <KeyboardArrowRightIcon />
        <ShieldIcon />
      </MatchupCardHeading>
      <MatchupCardContent>
        <TypeRow num='0' types={effGroup.immune} />
        <TypeRow num='½' types={effGroup.weak} />
        <TypeRow num='2' types={effGroup.strong} />
      </MatchupCardContent>
    </MatchupCardContainer>
  )
}

export default TypeDefCard
