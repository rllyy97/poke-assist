import styled from "styled-components"
import { COLORS } from "../../colors"
import LinkIcon from '@mui/icons-material/Link'
import { Typography } from "@mui/material"
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'
import { MoveProperty } from './index'


const TargettingCardContainer = styled.div`
  background-color: ${COLORS.cardDark};
  border-radius: 4px;
`

const TargettingContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-weight: bold;
  font-family: monospace;
  margin: 0px auto;
  width: -moz-available;
  margin: 0 12px 12px;
`

const TargetBox = styled.div`
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  border: 2px solid ${COLORS.border};
  color: ${COLORS.border};

  &.select {
    border-color: #fff;
    color: #fff;
  }

  &.all {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`

const TargettingCard = ({ target }) => {

  const T = {
    NONE: 'none',
    SELECT: 'select',
    ALL: 'all',
  }

  const P = {
    ALLY: '77%',
    ALL: '50%',
    OPPONENT: '23%',
  }

  const linkPos = {
    'all-other-pokemon': P.ALL,
    'all-opponents': P.OPPONENT,
    'user-and-allies': P.ALLY,
    // Field
    'users-field': P.ALLY,
    'opponents-field': P.OPPONENT,
    'entire-field': P.ALL,
  }

  const linkHeight = linkPos?.[target]

  const targetData = {
    'all-other-pokemon': [T.ALL, T.ALL, T.NONE, T.ALL],
    'all-opponents': [T.ALL, T.ALL, T.NONE, T.NONE],
    'selected-pokemon': [T.SELECT, T.SELECT, T.NONE, T.SELECT],
    'user': [T.NONE, T.NONE, T.ALL, T.NONE],
    'ally': [T.NONE, T.NONE, T.NONE, T.ALL],
    'user-and-allies': [T.NONE, T.NONE, T.ALL, T.ALL],
    // Field
    'users-field': [T.NONE, T.NONE, T.ALL, T.ALL],
    'opponents-field': [T.ALL, T.ALL, T.NONE, T.NONE],
    'entire-field': [T.ALL, T.ALL, T.ALL, T.ALL],
  }

  const data = targetData?.[target] ?? [T.NONE, T.NONE, T.NONE, T.NONE]

  return (
    <TargettingCardContainer>
      <MoveProperty icon={<HighlightAltIcon />} name="Target" />
      <TargettingContainer>
        <TargetBox className={data[0]}>
          FOE
        </TargetBox>
        <TargetBox className={data[1]}>
          FOE
        </TargetBox>
        <TargetBox className={data[2]}>
          SELF
        </TargetBox>
        <TargetBox className={data[3]}>
          ALLY
        </TargetBox>

        {linkHeight && (
          <div className={"flex"} style={{
            position: 'absolute', 
            left: '50%', 
            top: linkHeight,
            transform: 'translate(-50%, -50%)',
            padding: '2px',
            backgroundColor: COLORS.primary,
            borderRadius: '50%',
          }}>
            <LinkIcon htmlColor={COLORS.cardDark} fontSize='small'/>
          </div>
        )}
      </TargettingContainer>
    </TargettingCardContainer>
  )
}

export default TargettingCard