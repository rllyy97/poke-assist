import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import MoveTile from "../../MoveTile"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { setSelectedMove } from "../../../store/appStatus/appStatusSlice"
import { CustomMoveData } from "../../../types"

const MovePoolMoveContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: flex-start;
  cursor: pointer;
  margin: 0 -16px;
  padding: 6px 16px;

  &:hover {
    background: #333;
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

  const dispatch = useDispatch()

  const [isExpanded, setIsExpanded] = useState(false)
  const expandCallback = useCallback((e: any, expanded: boolean) => setIsExpanded(expanded), [])

  const showMoveDialog = useCallback((move: CustomMoveData) => {
    dispatch(setSelectedMove(move))
  }, [])

  return (
    <Accordion disabled={moves.length === 0} expanded={isExpanded} onChange={expandCallback}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {icon}
        <Typography style={{marginLeft: '8px'}}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {moves.map((m) => (
            <MovePoolMoveContainer key={m.name} onClick={() => showMoveDialog(m)}>

              {/* Level Up */}
              {method === 'level-up' && (
                <Typography style={{width: '24px'}}>
                  {m.versionGroupDetails.level_learned_at < 10 ? '0' : ''}
                  {m.versionGroupDetails.level_learned_at}
                </Typography>
              )}

              {/* Egg */}
              {method === 'egg' && (
                null
              )}

              {/* TM */}
              {method === 'machine' && m.machineName && (
                <Typography style={{ textTransform: 'uppercase', width: '48px' }}>
                  {m.machineName}
                </Typography>
              )}

              <MoveTile key={m.name} name={m.name} move={m.data} style={{flexGrow: 1}} />
            </MovePoolMoveContainer>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  ) 
}

export default MovePool