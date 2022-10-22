import { Badge, Chip } from '@mui/material'
import { Pokemon } from 'pokenode-ts'
import { COLORS } from '../../../colors'
import statBarBackground from '../../../images/stat_bars.png'
import { TYPE_DATA } from '../../../typeData'
import { StatBar } from './styles'

import { HIGHEST_STATS } from './statData'
import { useMemo } from 'react'


const StatRow = (props) => {
  const { pokeName, statName, value, color } = props

  const topPlace = useMemo(() => 
    Object.entries(HIGHEST_STATS?.[statName.replace('-', '')] ?? {}).find(([key,]) => key === pokeName)?.[1]
  , [pokeName, statName])

  return (
    <div className="flex row" style={{gap: '12px', transition: '0.2s', textTransform: 'capitalize'}}>
      <h4 style={{width: '80px', textAlign: 'right'}}>
        {statName.replace('special-attack', 'sp. atk').replace('special-defense', 'sp. def')}
      </h4>
      <h6 style={{width: '24px', height: '24px', lineHeight: '24px'}}>{value}</h6>
      <div style={{width: '260px', position: 'relative'}}>
        <img src={statBarBackground} alt='' style={{position: 'absolute', left: '0', zIndex: -1}} />
        <Badge color="primary" badgeContent={`#${topPlace}`} invisible={!topPlace}>
          <StatBar style={{width: `${value}px`, backgroundColor: color}} />
        </Badge>
      </div>
    </div>
  )
}

interface StatGroupProps {
  pokemon: Pokemon
}

const StatGroup = (props: StatGroupProps) => {

  const { pokemon } = props

  const color = TYPE_DATA?.[pokemon?.types?.[0].type.name]?.color

  return (
    <div className="flex column" style={{gap: '2px'}}>
      {pokemon?.stats.map((stat) => (
        <StatRow
          key={stat.stat.name}
          pokeName={pokemon.name}
          statName={stat.stat.name}
          value={stat.base_stat}
          color={color} 
        />
      ))}

      <Chip
        id="total-stat-count"
        label={pokemon?.stats.reduce((pv, cv) => pv + cv.base_stat, 0)}
        style={{
          margin: '16px auto 0px',
          backgroundColor: color,
          color: COLORS.background,
          fontWeight: 'bold',
        }}
      />
    </div>
  )
}

export default StatGroup