import styled from "styled-components"
import { Chip, SvgIcon } from "@mui/material"

import PercentIcon from '@mui/icons-material/Percent'
import FastForwardIcon from '@mui/icons-material/FastForward'

import TypeDot from "../TypeDot"
import PhysicalIcon from '../../icons/moveTypes/physical-move.svg?react'
import SpecialIcon from '../../icons/moveTypes/special-move.svg?react'
import StatusIcon from '../../icons/moveTypes/status-move.svg?react'

import { Move } from "pokenode-ts"
import { setSelectedMove } from "../../store/appStatus/appStatusSlice"
import { useDispatch } from "react-redux"

const MoveTileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: flex-start;
`

interface MoveTileProps {
  name: string
  move: Move
  style?: any
}

const MoveTile = (props: MoveTileProps) => {
  const { name, move, style } = props

  const dispatch = useDispatch()

  if (!move) return <p>Could not find: {name}</p>

  const { power, damage_class, meta, effect_entries, effect_chance } = move
  const numHitsString = meta?.max_hits > 1 ? ` * ${meta?.min_hits}-${meta?.max_hits}` : ''
  const powerString = `${power}${numHitsString} BP`

  const effectString = effect_entries[0]?.effect.replaceAll('$effect_chance', effect_chance?.toString())

  const moveCategoryIcon = damage_class.name === 'physical'
    ? PhysicalIcon
    : damage_class.name === 'special'
      ? SpecialIcon
      : StatusIcon

  const moveCategoryColor = damage_class.name === 'physical'
    ? "error"
    : damage_class.name === 'special'
      ? "info"
      : "disabled"

  const cStyle: any = {
    textTransform: 'capitalize',
    minWidth: '56px'
  }

  return (
    <MoveTileContainer style={style}>
      <TypeDot type={move.type.name} size={'24px'} />
      <h4 onClick={() => dispatch(setSelectedMove(move))} style={{textTransform: 'capitalize'}}>
        {move.name.replace('-', ' ')}
      </h4>
       {/* Spacer */} <div style={{flexGrow: 1}} /> {/* Spacer */}
      {move.priority !> 0 && <Chip size="small" icon={<FastForwardIcon />} label={move.priority} style={cStyle} />}
      {move.power !> 0 && <Chip size="small" label={powerString} style={cStyle} />}
      {move.accuracy !> 0 && <Chip size="small" icon={<PercentIcon />} label={move.accuracy} style={cStyle} />}
      {/* {move?.pp !> 0 && <Chip size="small" label={move.pp + ' PP'} />} */}
      <SvgIcon component={moveCategoryIcon} color={moveCategoryColor} />
      {/* {move.effect_entries?.length > 0 && (
        <p style={{fontSize: '12px'}}>
          
        </p>
      )} */}
    </MoveTileContainer>
  )
}

export default MoveTile
