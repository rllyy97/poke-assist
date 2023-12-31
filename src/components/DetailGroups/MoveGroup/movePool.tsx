import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import MoveTile from "../../MoveTile"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { setSelectedMove } from "../../../store/appStatus/appStatusSlice"
import { CustomMoveData } from "../../../types"
import { COLORS } from "../../../colors"

const MovePoolMoveContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: flex-start;
  cursor: pointer;
  margin: 0 -16px;
  padding: 6px 16px;

  &:hover {
    background: ${COLORS.cardHover};
  }
`

interface MovePoolProps {
  method: LearnMethods
  icon?: React.ReactNode
  title: string
  moves: CustomMoveData[]
}

type LearnMethods = "machine" | "egg" | "level-up"

const MovePool = (props: MovePoolProps) => {
  const { method, icon, title, moves } = props

  const [isExpanded, setIsExpanded] = useState(false)
  const expandCallback = useCallback((e: any, expanded: boolean) => setIsExpanded(expanded), [])

  

  return (
    <Accordion disabled={moves.length === 0} expanded={isExpanded} onChange={expandCallback}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {icon}
        <Typography style={{marginLeft: '8px'}}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {moves.map((m) => <MoveRow key={m.name} m={m} method={method} />)}
        </div>
      </AccordionDetails>
    </Accordion>
  ) 
}

const MoveRow = ({m, method}: {m: CustomMoveData, method: string}) => {
  const dispatch = useDispatch()
  const showMoveDialog = useCallback((move: CustomMoveData) => {
    dispatch(setSelectedMove(move))
  }, [])

  const machineType = m?.machineName?.replace(/[^a-zA-Z]/g, '')
  const methodColor = machineType === 'tm' ? COLORS.tm
    : machineType === 'hm' ? COLORS.hm
    : machineType === 'tr' ? COLORS.tr
    : machineType === 'tutor' ? COLORS.cardHover
    : COLORS.levelUp

  const levelString = String(m?.versionGroupDetails?.level_learned_at).padStart(2, '0')

  return (
    <MovePoolMoveContainer key={m.name} onClick={() => showMoveDialog(m)}>
      {/* if egg method */}
      {method !== 'egg' && (
        <Typography style={{ 
          textTransform: 'uppercase', 
          padding: '0 6px',
          borderRadius: '2px',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          background: methodColor,
        }}>
          {method === 'level-up' && levelString}
          {method === 'machine' && m?.machineName && m.machineName}
        </Typography>
      )}
      <MoveTile key={m.name} name={m.name} move={m.data} style={{flexGrow: 1}} />
    </MovePoolMoveContainer>
  )
}

export default MovePool