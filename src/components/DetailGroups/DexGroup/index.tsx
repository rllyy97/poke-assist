import { Tooltip, SvgIcon, Typography, Divider } from "@mui/material"
import { Pokemon, PokemonSpecies } from "pokenode-ts"
import { useState, useMemo } from "react"
import { FormatString } from "../../../utilities/stringManipulation"
import EvolutionGroup from "../EvolutionGroup"
import { FGenderBar, GenderGroup, MGenderBar, SubstatBlock } from "./styles"

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import ExpIcon from '@mui/icons-material/AutoGraph';

import { ReactComponent as KgIcon } from '../../../icons/weight-kg.svg'
import { ReactComponent as LbIcon } from '../../../icons/weight-lb.svg'
import { ReactComponent as HeightIcon } from '../../../icons/height.svg'
import { ReactComponent as PercentCircleIcon } from '../../../icons/percent-circle.svg'

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
    <div>
      <EvolutionGroup pokemon={species} />
      
      <div className="flex row" style={{marginTop: '16px', gap: '8px'}}>
        {/* CAPTURE RATE */}
        <Tooltip title="Capture Rate">
          <SubstatBlock>
            <SvgIcon component={PercentCircleIcon} />
            <h3>{captureRate}</h3>
          </SubstatBlock>
        </Tooltip>

        {/* EGG GROUPS */}
        {/* <SubstatBlock>
          <CustomSvgIcon src={EggIcon} />
          <h3>{species?.egg_groups.map((g) => g.name + ', ')}</h3>
        </SubstatBlock> */}

        <Tooltip title="Weight">
          <SubstatBlock onClick={() => setIsMetric(!isMetric)}>
            <SvgIcon component={isMetric ? KgIcon : LbIcon} />
            <h3>{weight}</h3>
          </SubstatBlock>
        </Tooltip>      

        <Tooltip title="Height">
          <SubstatBlock onClick={() => setIsMetric(!isMetric)}>
            <SvgIcon component={HeightIcon} />
            <h3>{height}</h3>
          </SubstatBlock>
        </Tooltip>
        
        <Tooltip title="Growth Rate">
          <SubstatBlock style={{textTransform: 'capitalize'}}>
            <ExpIcon />
            <h3>{FormatString(species?.growth_rate.name)}</h3>
          </SubstatBlock>
        </Tooltip>

      </div>
      <div style={{marginTop: '16px', width: '100%'}}>
        <GenderStat />
      </div>
    </div>
  )
}

export default DexGroup