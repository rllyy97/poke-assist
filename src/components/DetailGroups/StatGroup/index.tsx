import { Badge, Chip } from '@mui/material'
import { Pokemon, PokemonSpecies } from 'pokenode-ts'
import { COLORS } from '../../../colors'
import statBarBackground from '../../../images/stat_bars.png'
import { StatBar } from './styles'

import { HIGHEST_STATS } from './statData'
import { useMemo } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import StatsIcon from '@mui/icons-material/BarChart';
import { usePrimaryColor } from '../../../store/pokemonHistory/pokemonHistorySelectors'
import { CustomDivider } from '../../../GlobalComponents'


const StatRow = (props) => {
  const { pokeName, statName, stat } = props

  const color = usePrimaryColor()

  const value = stat?.base_stat ?? 0
  const effort = stat?.effort

  const topPlace = useMemo(() => 
    Object.entries(HIGHEST_STATS?.[statName?.replace('-', '')] ?? {}).find(([key,]) => key === pokeName)?.[1]
  , [pokeName, statName])

  const EffortDots = () => (
    <div style={{position: 'absolute', left: '0', zIndex: 5, color: 'black', fontSize: '6px', padding: '4px', display: 'flex', gap: '1px'}}>
      {new Array(effort).fill(0).map(() => <CircleIcon fontSize="inherit"/>)}
    </div>
  )

  return (
    <div className="flex row" style={{gap: '12px', textTransform: 'capitalize'}}>
      <h4 style={{width: '80px', textAlign: 'right'}}>
        {statName?.replace('special-attack', 'sp. atk').replace('special-defense', 'sp. def')}
      </h4>
      <h6 style={{width: '24px', height: '24px', lineHeight: '24px'}}>{value}</h6>
      <div  className="flex row left" style={{width: '260px', position: 'relative'}}>
        <img src={statBarBackground} alt='' style={{position: 'absolute', left: '0', zIndex: -1}} />
        <EffortDots />
        <Badge color="primary" badgeContent={`#${topPlace}`} invisible={!topPlace}>
          <StatBar style={{width: `${value}px`, backgroundColor: color}} />
        </Badge>
      </div>
    </div>
  )
}

interface StatGroupProps {
  pokemon: Pokemon
  species: PokemonSpecies
}

const STAT_NAMES = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed'
]

const StatGroup = (props: StatGroupProps) => {
  const { pokemon } = props

  const color = usePrimaryColor()

  const StatTotal = () => (
    <Chip
      id="total-stat-count"
      label={pokemon?.stats.reduce((pv, cv) => pv + cv.base_stat, 0) ?? '...'}
      style={{
        margin: '16px auto 0px',
        backgroundColor: color,
        color: COLORS.background,
        fontWeight: 'bold',
      }}
    />
  )

  return (
    <div className="flex col">
      <CustomDivider icon={<StatsIcon />} text="BASE STATS" />
      <div className="flex col" style={{gap: '2px', marginTop: '8px'}}>
        {pokemon?.stats.map((stat) => (
          <StatRow 
            key={stat.stat.name} 
            pokeName={pokemon.name} 
            statName={stat.stat.name} 
            stat={stat}
          />
        )) ?? (
          <div>
            {STAT_NAMES.map((name, i) => (<StatRow key={i} statName={name} />))}
          </div>
        )}
      </div>

      <StatTotal />
      
    </div>
  )
}

export default StatGroup