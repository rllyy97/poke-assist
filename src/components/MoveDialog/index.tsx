import styled from "styled-components"
import { Accordion, AccordionDetails, AccordionSummary, Chip, Dialog, Divider, SvgIcon, Typography } from "@mui/material"

import PercentIcon from '@mui/icons-material/Percent'
import FastForwardIcon from '@mui/icons-material/FastForward'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import PhysicalIcon from '../../icons/moveTypes/physical-move.svg?react'
import SpecialIcon from '../../icons/moveTypes/special-move.svg?react'
import StatusIcon from '../../icons/moveTypes/status-move.svg?react'

import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useSelectedMove } from "../../store/appStatus/appStatusSelectors"
import { setSelectedPokemon, setSelectedMove } from "../../store/appStatus/appStatusSlice"
import TypeChip from "../TypeChip"
import PokeTile from "../PokeTile"
import { Move } from "pokenode-ts"
import { useApi } from "../../store/api/apiSelectors"
import { setCurrentPokemon } from "../../store/pokemonHistory/pokemonHistorySlice"

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

  const api = useApi()
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
      <div>
        <Accordion style={{ background: 'none', border: 'none', boxShadow: 'none' }}>
          <AccordionSummary
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography>Learned by</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={"flex row left"}>
              {learned_by_pokemon?.map((p, i) => (
                // These are variants, NOT species
                <PokeTile
                  key={i}
                  name={p.name} 
                  url={p.url}
                  onClick={async () => {
                    dispatch(setSelectedMove(undefined))
                    // get species from pokemon
                    const variant = await api.pokemon.getPokemonByName(p.name)
                    const species = await api.pokemon.getPokemonSpeciesByName(variant.species.name)
                    
                    dispatch(setSelectedPokemon(species.name))
                    dispatch(setCurrentPokemon(species))

                    // This gets overriden by our defaulting logic
                    // dispatch(setCurrentVariant(variant))
                  }}
                />
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      
      

    </MoveDialogContainer>
  )

}

export default MoveDialog
