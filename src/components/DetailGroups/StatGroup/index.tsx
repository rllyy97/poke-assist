import { Badge } from '@mui/material'
import { Pokemon, PokemonSpecies } from 'pokenode-ts'
import statBarBackground from '../../../images/stat_bars.png'
import { StatBar, StatBarsContainer, StatTotalContainer } from './styles'

import { HIGHEST_STATS } from './statData'
import { useMemo } from 'react'

import CircleIcon from '@mui/icons-material/Circle'
import StatsIcon from '@mui/icons-material/BarChart'
import { usePrimaryColor } from '../../../store/pokemonHistory/pokemonHistorySelectors'


const StatRow = (props) => {
  const { pokeName, statName, stat } = props

  const color = usePrimaryColor()

  const value = stat?.base_stat ?? 0
  const effort = stat?.effort ?? 0

  const topPlace = useMemo(() => 
    Object.entries(HIGHEST_STATS?.[statName?.replace('-', '')] ?? {}).find(([key,]) => key === pokeName)?.[1]
  , [pokeName, statName])

  const EffortDots = () => (
    <div style={{position: 'absolute', left: '0', zIndex: 5, color: 'black', fontSize: '6px', padding: '4px', display: 'flex', gap: '1px'}}>
      {new Array(effort).fill(0).map((_, i) => (
        <CircleIcon key={i} fontSize="inherit" />
      ))}
    </div>
  )

  return (
    <div className="flex row" style={{gap: '12px', textTransform: 'capitalize'}}>
      <h4 style={{width: '80px', textAlign: 'right'}}>
        {statName?.replace('special-attack', 'sp. atk').replace('special-defense', 'sp. def')}
      </h4>
      <h6 style={{width: '24px', height: '24px', lineHeight: '24px'}}>{value}</h6>
      <div  className="flex row left" style={{width: '260px', position: 'relative'}}>
        <img src={statBarBackground} alt='' style={{position: 'absolute', filter: 'brightness(150%)'}} />
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
    <StatTotalContainer
      id="total-stat-count"
      className="flex row"
      style={{backgroundColor: color}}
    >
      <StatsIcon fontSize='small' />
      <h4>{pokemon?.stats.reduce((pv, cv) => pv + cv.base_stat, 0) ?? '...'}</h4>
    </StatTotalContainer>
  )

  return (
    <div className="flex col card fullwidth">
      <StatTotal />
      <StatBarsContainer className="flex col">
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
      </StatBarsContainer>
    </div>
  )
}

export default StatGroup