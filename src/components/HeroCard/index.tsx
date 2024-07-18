import { Pokemon, PokemonAbility } from "pokenode-ts"
import { PokeImg, PokeImgSmall } from "../../styles"
import { TYPE_DATA } from "../../typeData"
import { HeroCardWrapper, PsuedoBorder, SpeciesName, TypeContainer, VariantName } from "./styles"
import CircularProgress from '@mui/material/CircularProgress'

import TypeDot from "../TypeDot"
import AbilityChip from "../AbilityChip"
import ChipRow from "../ChipRow"
import { IdFromUrl } from "../../utilities/stringManipulation"
import { useMemo, useState } from "react"
import { IconButton } from "@mui/material"

import { SvgIcon as MuiSvgIcon } from '@mui/material'
import ShinyIcon from '../../icons/shiny.svg?react'
import ReplayIcon from '@mui/icons-material/Replay'
import { useHeroSize } from "../../store/appStatus/appStatusSelectors"
import { setHeroSize } from "../../store/appStatus/appStatusSlice"
import { useDispatch } from "react-redux"
import CryButton from "../CryButton"

interface HeroCardProps {
  isLoading?: boolean
  pokemon: Pokemon
  content?: any
  speciesName?: string
}

const HeroCard = (props: HeroCardProps) => {
  const { isLoading, pokemon, content, speciesName } = props

  const dispatch = useDispatch();
  const heroSize = useHeroSize()

  const variantName = pokemon?.name.split(`${speciesName}-`)[1] ?? ''
  const variantNum = pokemon?.id

  const [showArt, setShowArt] = useState(true)
  const [showShiny, setShowShiny] = useState(false);
  
  const currentHeroImage = useMemo(() => {
    if (!pokemon?.sprites) return ''
    const defaultArt = pokemon.sprites.other['official-artwork'].front_default
    const defaultHomeImgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${variantNum}.png`
    const shinyHomeImgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${variantNum}.png`

    return (showArt) ? defaultArt
      : (showShiny) ? shinyHomeImgSrc
      : defaultHomeImgSrc
  }, [pokemon?.sprites, showArt, showShiny, variantNum])

  const id = IdFromUrl(pokemon?.species?.url).padStart(4, '0')

	const abilities = useMemo(() => {
		if (!pokemon) return []
		let abilities = pokemon?.abilities
		// The abilities array sometimes includes the same ability twice, with the second instance being hidden
		// This filters out the hidden ability
		let hiddenName = abilities?.find((a: PokemonAbility) => a.is_hidden)?.ability.name
		let hiddenCount = abilities?.filter((a: PokemonAbility) => a.ability.name === hiddenName).length
		if (hiddenCount > 1) abilities = abilities?.filter((a: PokemonAbility) => !a.is_hidden)
		return abilities
	}, [pokemon])
  
  return (
    <HeroCardWrapper>
      <PsuedoBorder
        c1={TYPE_DATA?.[pokemon?.types?.[0]?.type?.name]?.color}
        c2={TYPE_DATA?.[pokemon?.types?.[1]?.type?.name]?.color}
      />
      {heroSize === 'small' && <PokeImgSmall src={currentHeroImage} onClick={() => dispatch(setHeroSize('default'))} />}
      {pokemon && (
        <div className="flex col left" style={{width: '100%', position: 'relative'}}>
          <SpeciesName>
            {speciesName}
          </SpeciesName>
          <VariantName>
            #{id}{variantName && ` - ${variantName}`}
          </VariantName>
          <TypeContainer>
            {pokemon.types?.[0] && <TypeDot type={pokemon.types?.[0]?.type.name} /> }
            {pokemon.types?.[1] && <TypeDot type={pokemon.types?.[1]?.type.name} /> }
          </TypeContainer>
          {isLoading && <CircularProgress /> }
          
          {heroSize === 'default' ? (
            <PokeImg src={currentHeroImage} onClick={() => dispatch(setHeroSize('small'))} /> 
          ) : (
            <div style={{width: '20px', height: '16px'}} />
          )}
          <ChipRow>
            {abilities?.map((a: PokemonAbility) => (
              <AbilityChip 
								key={a.ability.name} 
								id={a.ability.url.split('/')?.at(-2)} 
								name={a.ability.name} 
								isHiddenAbility={a.is_hidden} 
							/>
            ))}
          </ChipRow>

          <div style={{position: 'absolute', right: '-4px', bottom: '-4px', display: 'flex', gap: '4px'}}>
            {!showArt && <IconButton onClick={() => {
                setShowShiny(false)
                setShowArt(true)
              }}>
                <ReplayIcon />
              </IconButton>
            }
            <IconButton color={showShiny ? 'primary' : 'default'} onClick={() => {
              setShowShiny(!showShiny)
              setShowArt(false)
            }}>
              <MuiSvgIcon component={ShinyIcon} />
            </IconButton>
						<CryButton pokemon={pokemon} />
          </div>
        </div>
      )}
      {content}
    </HeroCardWrapper>
  )
}

export default HeroCard