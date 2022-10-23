import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CustomMoveData } from "."
import MoveTile from "../../MoveTile"
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

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

  const [isExpanded, setIsExpanded] = useState(false)
  const expandCallback = useCallback((e: any, expanded: boolean) => setIsExpanded(expanded), [])
  useEffect(() => {
    if (moves.length === 0) setIsExpanded(false)
    else if (!isExpanded) setIsExpanded(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moves])

  return (
    <Accordion disabled={moves.length === 0} expanded={isExpanded} onChange={expandCallback}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {icon}
        <Typography style={{marginLeft: '8px'}}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {moves.map((m) => (
            <MovePoolMoveContainer key={m.name} onClick={() => console.log(m)}>

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