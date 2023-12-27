import styled from "styled-components"
import { Chip, Dialog, Divider, SvgIcon } from "@mui/material"

import PercentIcon from '@mui/icons-material/Percent'
import FastForwardIcon from '@mui/icons-material/FastForward'

import TypeDot from "../TypeDot"
import PhysicalIcon from '../../icons/moveTypes/physical-move.svg?react'
import SpecialIcon from '../../icons/moveTypes/special-move.svg?react'
import StatusIcon from '../../icons/moveTypes/status-move.svg?react'

import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useSelectedMove } from "../../store/appStatus/appStatusSelectors"
import { setSelectedMove, setSelectedPokemon } from "../../store/appStatus/appStatusSlice"
import TypeChip from "../TypeChip"
import PokeTile from "../PokeTile"
import { Move } from "pokenode-ts"

const MoveDialogContainer = styled.div`
  padding: 24px 16px;
  min-width: 300px;
`

const MoveDialog = () => {

  const dispatch = useDispatch()
  
  const selectedMove = useSelectedMove()
  const dismissMoveDialog = useCallback(() => dispatch(setSelectedMove(undefined)), [])

  return (
    <Dialog open={!!selectedMove} onClose={dismissMoveDialog}>
      <DialogContent move={selectedMove?.data} />
    </Dialog>
  )
}

const DialogContent = (props: { move: Move}) => {
  const { move } = props

  const dispatch = useDispatch()

  if (!move) return <></>

  const { 
    power, 
    damage_class, 
    meta, 
    effect_entries, 
    effect_chance, 
    learned_by_pokemon
  } = move

  const numHitsString = meta?.max_hits > 1 ? ` * ${meta?.min_hits}-${meta?.max_hits}` : ''
  const powerString = `${power}${numHitsString} BP`

  const effectString = effect_entries[0]?.effect.replaceAll('$effect_chance', effect_chance?.toString())

  const moveCategories = {
    physical: {
      text: 'Physical',
      icon: PhysicalIcon,
      color: 'error'
    },
    special: {
      text: 'Special',
      icon: SpecialIcon,
      color: 'info'
    },
    status: {
      text: 'Status',
      icon: StatusIcon,
      color: 'disabled'
    }
  }

  const moveCategory = moveCategories[damage_class.name] ?? moveCategories.status

  const cStyle: any = {
    textTransform: 'capitalize',
    minWidth: '56px'
  }

  console.log("### MOVE", move)

  return (
    <MoveDialogContainer className={"flex col left"}>
      <h2 style={{textTransform: 'capitalize'}}>
        {move.name.replace('-', ' ')}
      </h2>
      <TypeChip type={move.type.name} />
      <div>
        <SvgIcon component={moveCategory.icon} color={moveCategory.color} />
        <span>{moveCategory.text}</span>
      </div>

      <Divider />

      {move.priority !> 0 && <Chip icon={<FastForwardIcon />} label={move.priority} style={cStyle} />}
      {move.power !> 0 && <Chip label={powerString} style={cStyle} />}
      {move.accuracy !> 0 && <Chip icon={<PercentIcon />} label={move.accuracy} style={cStyle} />}
      {move?.pp !> 0 && <Chip label={move.pp + ' PP'} />}
      {/* {move.effect_entries?.length > 0 && (
        <p style={{fontSize: '12px'}}>
          
        </p>
      )} */}
      <Divider />
      <h4>Learned by:</h4>
      <div className={"flex row left"}>
        {learned_by_pokemon?.map((p, i) => (
          <PokeTile
            key={i}
            name={p.name} 
            onClick={() => {
              dispatch(setSelectedMove(undefined))
              dispatch(setSelectedPokemon(p.name))
            }}
          />
        ))}
      </div>

    </MoveDialogContainer>
  )

}

export default MoveDialog
