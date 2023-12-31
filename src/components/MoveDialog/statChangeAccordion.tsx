import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from "@mui/material"
import { setSelectedMove, setSelectedPokemon } from "../../store/appStatus/appStatusSlice"
import { setCurrentPokemon } from "../../store/pokemonHistory/pokemonHistorySlice"
import PokeTile from "../PokeTile"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { COLORS } from "../../colors"


const StatChangeAccordion = ({ statChance, statChanges = [], target = undefined }) => {

  const STAT_NAMES = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
    'evasion',
  ]

  const disabled = statChanges.length === 0

  return (
    <Accordion style={{ boxShadow: 'none' }} disabled={disabled}>
      <AccordionSummary id="stat-changes" expandIcon={<ExpandMoreIcon />} disabled={disabled}>
        <Typography>Stat changes</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {statChance != 100 && statChance != 0 && <Typography>Chance to change stat: {statChance}%</Typography>}
        <div className="flex row">
          {STAT_NAMES.map((stat, i) => (
            <StatColumn key={i} stat={stat} change={statChanges.find(s => s.stat.name === stat)?.change || 0} />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

const StatColumn = ({ stat, change }) => {

  const prettyNames = {
    'hp': 'HP',
    'attack': 'Atk',
    'defense': 'Def',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    'speed': 'Spe',
    'evasion': 'Eva',
  }

  const margin = -12;

  return (
    <div className="flex col" style={{gap: 0, width: '40px'}}>
      <KeyboardArrowUpIcon fontSize='large' color={change >= 6 ? 'success' : 'disabled'} style={{margin}} />
      <KeyboardArrowUpIcon fontSize='large' color={change >= 5 ? 'success' : 'disabled'} style={{margin}} />
      <KeyboardArrowUpIcon fontSize='large' color={change >= 4 ? 'success' : 'disabled'} style={{margin}} />
      <KeyboardArrowUpIcon fontSize='large' color={change >= 3 ? 'success' : 'disabled'} style={{margin}} />
      <KeyboardArrowUpIcon fontSize='large' color={change >= 2 ? 'success' : 'disabled'} style={{margin}} />
      <KeyboardArrowUpIcon fontSize='large' color={change >= 1 ? 'success' : 'disabled'} style={{margin}} />
      <Typography style={{margin: '8px'}}>{prettyNames[stat]}</Typography>
      <KeyboardArrowDownIcon fontSize='large' color={change <= -1 ? 'error' : 'disabled'} style={{margin}} />
      <KeyboardArrowDownIcon fontSize='large' color={change <= -2 ? 'error' : 'disabled'} style={{margin}} />
      <KeyboardArrowDownIcon fontSize='large' color={change <= -3 ? 'error' : 'disabled'} style={{margin}} />
      <KeyboardArrowDownIcon fontSize='large' color={change <= -4 ? 'error' : 'disabled'} style={{margin}} />
      <KeyboardArrowDownIcon fontSize='large' color={change <= -5 ? 'error' : 'disabled'} style={{margin}} />
      <KeyboardArrowDownIcon fontSize='large' color={change <= -6 ? 'error' : 'disabled'} style={{margin}} />
    </div>
  )
}

export default StatChangeAccordion
