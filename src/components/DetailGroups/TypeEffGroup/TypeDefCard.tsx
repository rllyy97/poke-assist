import styled from "styled-components"
import { COLORS } from "../../../colors"
import { TYPE_DATA } from "../../../typeData"
import TypeDot from "../../TypeDot"
import TypeRow from "./TypeRow"

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ShieldIcon from '@mui/icons-material/Shield'
import TeraIcon from "../../../icons/teraIcon.svg?react"

const MatchupCardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.card};
  overflow: hidden;
  position: relative;
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

  const { type, effGroup, teraBoosted } = props;

  if (!type) return <></>

  return (
    <MatchupCardContainer>
      <MatchupCardHeading style={{background: TYPE_DATA[type.name].color}}>
        <TypeDot type={type.name} />
        <KeyboardArrowRightIcon />
        <ShieldIcon />
      </MatchupCardHeading>
      <MatchupCardContent>
        <TypeRow value={0} label='0' types={effGroup.immune} />
        <TypeRow value={2} label='½' types={effGroup.weak} />
        <TypeRow value={0.5} label='2' types={effGroup.strong} />
      </MatchupCardContent>
      {teraBoosted && (
        <div className="flex row" style={{
          fill: COLORS.primary,
          color: COLORS.primary,
          position: 'absolute', 
          right: '8px', 
          bottom: '16px',
          alignItems: 'center',
          gap: '4px',
        }}>
          <div style={{position: 'absolute', width: '96px', height: '96px', transform: 'translate(-30px, 42px)'}}>
            <TeraIcon />
          </div>
          <h2>×</h2>
          <h1>2</h1>
        </div>
      )}
    </MatchupCardContainer>
  )
}

export default TypeDefCard
