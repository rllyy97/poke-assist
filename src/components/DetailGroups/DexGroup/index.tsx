import { Tooltip, SvgIcon, Typography, Chip } from "@mui/material"
import { Pokemon, PokemonSpecies } from "pokenode-ts"
import { useState, useMemo } from "react"
import { CapitalizeFirstLetter, FormatString } from "../../../utilities/stringManipulation"
import EvolutionGroup from "../EvolutionGroup"
import { FGenderBar, GenderGroup, MGenderBar, SubstatBlock } from "./styles"

import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import ExpIcon from '@mui/icons-material/AutoGraph'

import EggIcon from '../../../icons/egg.svg?react'
import KgIcon from '../../../icons/weight-kg.svg?react'
import LbIcon from '../../../icons/weight-lb.svg?react'
import HeightIcon from '../../../icons/height.svg?react'
import PercentCircleIcon from '../../../icons/percent-circle.svg?react'
import StatGroup from "../StatGroup"
import { COLORS } from "../../../colors"

interface DexGroupProps {
  pokemon: Pokemon
  species: PokemonSpecies
}

const DexGroup = (props: DexGroupProps) => {
  const { pokemon, species } = props

  const [isMetric, setIsMetric] = useState(true)
  const { height, weight } = useMemo(() => {
    const weight = (pokemon?.weight / 10 * (!isMetric ? 2.20462 : 1)).toFixed(1)
    const metricHeight = `${(pokemon?.height / 10).toFixed(1)} m`
    const inches = Math.round((pokemon?.height / 10 / 0.3048) * 12)
    const imperialHeight = `${Math.floor(inches / 12)}' ${Math.round(inches % 12)}"`

    return { weight, height: isMetric ? metricHeight : imperialHeight}
  }, [pokemon, isMetric])

  const captureRate = useMemo(() => species?.capture_rate, [species?.capture_rate])
  const genderRate = useMemo(() => 1-(species?.gender_rate/8), [species])

  const GenderStat = () => {
    return genderRate > 1 ? (
      <SubstatBlock style={{width: '100%', padding: '6px'}}>
        <Typography style={{fontWeight: 'bold'}}>Gender Unknown</Typography>
      </SubstatBlock>
    ) : (
      <SubstatBlock style={{width: '100%', justifyContent: 'space-between', padding: '6px'}}>
        <GenderGroup style={{opacity: genderRate > 0 ? 1:0, justifyContent: 'start'}} >
          <MGenderBar style={{width: `${genderRate *100}%`}} />
          <MaleIcon />
          <Typography style={{fontWeight: 'bold'}}>{genderRate * 100}%</Typography>
        </GenderGroup>
        <GenderGroup style={{opacity: genderRate < 1 ? 1:0, display: 'flex'}} >
          <FGenderBar style={{width: `${(1-genderRate) *100}%`}} />
          <Typography style={{fontWeight: 'bold'}}>{(1-genderRate) * 100}%</Typography>
          <FemaleIcon />
        </GenderGroup>
      </SubstatBlock>
    )
  }

  return (
    <div className="flex col fullwidth" style={{gap: '16px'}}>
      <StatGroup pokemon={pokemon} species={species} />

      <EvolutionGroup pokemon={species} />

      <GenderStat />
      
      <div className="card flex row fullwidth" style={{justifyContent: 'space-evenly'}}>

        <Tooltip title="Height">
          <SubstatBlock onClick={() => setIsMetric(!isMetric)}>
            <SvgIcon component={HeightIcon} />
            <h4>{height}</h4>
          </SubstatBlock>
        </Tooltip>

        <Tooltip title="Weight">
          <SubstatBlock onClick={() => setIsMetric(!isMetric)}>
            <SvgIcon component={isMetric ? KgIcon : LbIcon} />
            <h4>{weight}</h4>
          </SubstatBlock>
        </Tooltip>      

        <Tooltip title="Capture Rate">
          <SubstatBlock>
            <SvgIcon component={PercentCircleIcon} />
            <h4>{captureRate}</h4>
          </SubstatBlock>
        </Tooltip>

        <Tooltip title="Growth Rate">
          <SubstatBlock style={{textTransform: 'capitalize'}}>
            <ExpIcon />
            <h4>{FormatString(species?.growth_rate.name)}</h4>
          </SubstatBlock>
        </Tooltip>

      </div>

      <div className="card flex row fullwidth" style={{justifyContent: 'flex-start', padding: '16px', }}>
        <div className="flex" style={{marginRight: '16px'}}>
          <SvgIcon component={EggIcon} />
          <h4>Egg Groups</h4>
        </div>
        {species?.egg_groups.map((g) => (
          <Chip key={g.name} label={CapitalizeFirstLetter(g?.name)} style={{backgroundColor: COLORS.background}} />
        ))}
      </div>
    </div>
  )
}

export default DexGroup