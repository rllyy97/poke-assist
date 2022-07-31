

import { Pokemon } from 'pokenode-ts'
import statBarBackground from '../../images/stat_bars.png'
import { TYPE_DATA } from '../../typeData'
import { StatBar } from './styles'


const StatRow = (props) => (
  <div className="flex row" style={{gap: '12px', transition: '0.2s', textTransform: 'capitalize'}}>
    <h4 style={{width: '80px', textAlign: 'right'}}>{props.name.replace('special-attack', 'sp. atk').replace('special-defense', 'sp. def')}</h4>
    <h6 style={{width: '24px', height: '24px', lineHeight: '24px'}}>{props.value}</h6>
    <div style={{width: '260px', position: 'relative'}}>
      <img src={statBarBackground} alt='' style={{position: 'absolute', left: '0', zIndex: -1}} />
      <StatBar style={{width: `${props.value}px`, backgroundColor: props?.color, color: 'white'}} />
    </div>
  </div>
)


const StatGroup = (props) => {

  const { pokemon }: {pokemon: Pokemon} = props

  const color = TYPE_DATA?.[pokemon?.types?.[0].type.name]?.color

  return (
    <div className="flex column" style={{gap: '2px'}}>
      {pokemon?.stats.map((stat) => (
        <StatRow
          key={stat.stat.name}
          name={stat.stat.name}
          value={stat.base_stat}
          color={color} 
        />
      ))}
    </div>
  )
}

export default StatGroup