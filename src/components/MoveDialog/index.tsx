import { Dialog, SvgIcon, Typography } from "@mui/material"

import PercentIcon from '@mui/icons-material/Percent'
import FastForwardIcon from '@mui/icons-material/FastForward'

import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useSelectedMove } from "../../store/appStatus/appStatusSelectors"
import { setSelectedMove } from "../../store/appStatus/appStatusSlice"
import { Move } from "pokenode-ts"
import MoveClassChip from "../MoveClassChip"
import { MoveDialogContainer, MovePropertyContainer, PropertiesContainer } from "./styles"

import PhysicalIcon from '../../icons/moveTypes/physical-move.svg?react'
import CircleIcon from '@mui/icons-material/Circle'
import { FormatString } from "../../utilities/stringManipulation"
import LearnedByAccordion from "./learnedByAccordion"
import TargettingCard from "./targettingCard"
import EffectsCard from "./effectsCard"
import TypeChip from "../TypeChip"


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

  if (!move) return <></>

  const { 
    power,
    accuracy,
    damage_class, 
    meta, 
    effect_entries, 
    effect_chance, 
    learned_by_pokemon,
    pp,
    priority,
    name,
    type,
  } = move

  const numHitsString = meta?.max_hits > 1 ? ` * ${meta?.min_hits}-${meta?.max_hits}` : ''
  const powerString = power ? `${power}${numHitsString}` : `0`
  const accuracyString = accuracy ? `${accuracy}%` : '--'

  const effectString = effect_entries[0]?.effect.replaceAll('$effect_chance', effect_chance?.toString())

  console.log("### MOVE", move)

  return (
    <MoveDialogContainer className={"flex col stretch"}>

      <h1 style={{textTransform: 'capitalize', flexGrow: 1}}>
        {FormatString(name)}
      </h1>

      <Typography>{effectString}</Typography>

      <div className={"flex row left"} style={{ margin: '8px 0 16px' }}>
        <TypeChip type={type.name} />
        <MoveClassChip className={damage_class.name} />
      </div>

      <PropertiesContainer>
        <MoveProperty icon={<SvgIcon component={PhysicalIcon} />} name="Power" value={powerString} fade={!power} />
        <MoveProperty icon={<CircleIcon />} name="PP" value={pp} subValue={`(${pp * 1.6})`}/>
        <MoveProperty icon={<PercentIcon />} name="Accuracy" value={accuracyString} fade={!accuracy} />
        <MoveProperty icon={<FastForwardIcon />} name="Priority" value={priority} fade={priority == 0} />

        <TargettingCard target={move?.target?.name} />
        <EffectsCard move={move} />
      </PropertiesContainer>

      <div>
        <LearnedByAccordion pokemon={learned_by_pokemon} />
      </div>

    </MoveDialogContainer>
  )
}

export const MoveProperty = ({icon, name, value = undefined, subValue = undefined, fade = false}) => {

  return (
    <MovePropertyContainer style={fade ? { opacity: 0.5 } : {}}>
      {icon}
      <Typography style={{ flexGrow: 1 }}>{name}</Typography>
      <Typography style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
        {value}
        </Typography>
      {subValue && <Typography style={{ opacity: 0.5, fontSize: '12px', fontFamily: 'monospace' }}>
        {subValue}
      </Typography>}
    </MovePropertyContainer>
  )
}

export default MoveDialog
