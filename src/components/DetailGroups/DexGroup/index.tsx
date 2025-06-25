import { Tooltip, SvgIcon, Typography, Chip, Button, ButtonGroup, ToggleButton } from "@mui/material"
import { Pokemon, PokemonSpecies } from "pokenode-ts"
import { useState, useMemo, useEffect } from "react"
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
import SmogonButton from "../../SmogonButton"
import { GENERATIONS } from "../../../data/interfaces"

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

	const generations = useMemo(() => {
		var filteredTexts = species?.flavor_text_entries.filter((e) => e.language.name === 'en') ?? []
		var g: Record<string, string[]>[] = new Array(9).fill(null).map(() => ({}))
		// Combine any entries that have the same text
		filteredTexts.forEach((t) => {
			t.flavor_text = t.flavor_text.replace("", " ")
			const gameId = (t as any).version.name
			const generationIndex = GENERATIONS.findIndex((v) => v.games.includes(gameId))
			if (generationIndex == -1) {
				throw Error("Could not find gameId:", gameId)
			}
			const existingKey = Object.keys(g[generationIndex]).find((k) => k.toLowerCase() == t.flavor_text.toLowerCase())
			if (!existingKey) {
				g[generationIndex][t.flavor_text] = [FormatString((t as any).version.name)]
			} else {
				g[generationIndex][existingKey].push(FormatString((t as any).version.name))
			}
		}, []);
		return g;
	}, [species?.flavor_text_entries])

	const [selectedGeneration, setSelectedGeneration] = useState<number>(0)

	useEffect(() => {
		if (generations.length > 0) {
			const firstNonEmptyIndex = generations.findIndex(g => Object.keys(g).length > 0);
			if (firstNonEmptyIndex !== -1) {
				setSelectedGeneration(firstNonEmptyIndex);
			}
		}
	}, [generations]);

	const FlavorTextEntries = () => (
		<SubstatBlock style={{padding: '16px', gap: '12px', flexDirection: "column", textAlign: "left" }}>
			<div style={{ width: "100%", display: "flex", gap: "6px", marginBottom: "8px", alignItems: "center" }}>
				<Typography fontWeight="700" style={{ flexGrow: 1 }}>
					Dex Entries
				</Typography>
				{GENERATIONS.map((g, index) => (
					<ToggleButton 
						onClick={() => setSelectedGeneration(index)}
						value={index}
						selected={selectedGeneration == index}
						disabled={Object.keys(generations[index]).length === 0}
						style={{ maxWidth: "32px", maxHeight: "32px" }}
					>
						{g.id}
					</ToggleButton>
				))}
			</div>
			{Object.entries(generations[selectedGeneration]).map(([flavorText, gamesArray]) => (
				<div>
					<Typography fontWeight="700">
						{gamesArray.join(" / ")}
					</Typography>
					<Typography color="GrayText" style={{fontStyle: 'italic', marginTop: '2px', textAlign: 'left'}}>
						{flavorText}
					</Typography>
				</div>
			))}
		</SubstatBlock>
	)

  const GenderStat = () => (
    genderRate > 1 ? (
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
	)

	const RandomStats = () => (
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
	)

  return (
    <div className="flex col fullwidth" style={{gap: '16px'}}>
      <StatGroup pokemon={pokemon} species={species} />

      <EvolutionGroup pokemon={species} />

			<FlavorTextEntries />

      <GenderStat />
      
			<RandomStats />

      <div className="card flex row fullwidth" style={{justifyContent: 'flex-start', padding: '16px', }}>
        <div className="flex" style={{marginRight: '16px'}}>
          <SvgIcon component={EggIcon} />
          <h4>Egg Groups</h4>
        </div>
        {species?.egg_groups.map((g) => (
          <Chip key={g.name} label={CapitalizeFirstLetter(g?.name)} style={{backgroundColor: COLORS.background}} />
        ))}
      </div>

			<div className="flex col fullwidth" style={{gap: '16px'}}>
				<SmogonButton pokemon={pokemon} />
			</div>
    </div>
  )
}

export default DexGroup
