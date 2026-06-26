import { Pokemon, PokemonAbility } from "pokenode-ts"
import { PokeImg, PokeImgSprite } from "../../styles"
import { TYPE_DATA } from "../../typeData"
import { HeroCardWrapper, PsuedoBorder, SpeciesName, TypeContainer, VariantName } from "./styles"
import CircularProgress from '@mui/material/CircularProgress'
import Skeleton from '@mui/material/Skeleton'

import TypeDot from "../TypeDot"
import AbilityChip from "../AbilityChip"
import ChipRow from "../ChipRow"
import { IdFromUrl } from "../../utilities/stringManipulation"
import { useMemo, useState } from "react"
import { IconButton } from "@mui/material"

import { SvgIcon as MuiSvgIcon } from '@mui/material'
import ShinyIcon from '../../icons/shiny.svg?react'
import ImageIcon from '@mui/icons-material/Image'
import PixelateIcon from '@mui/icons-material/GridOn'

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

  const variantName = pokemon?.name.split(`${speciesName}-`)[1] ?? ''
  const variantNum = pokemon?.id

  const [showShiny, setShowShiny] = useState(false);
  const [showSprite, setShowSprite] = useState(false);
  
  const currentHeroImage = useMemo(() => {
    if (!pokemon?.sprites) return ''
    if (showSprite) {
      return showShiny
        ? (pokemon.sprites.front_shiny ?? pokemon.sprites.front_default)
        : pokemon.sprites.front_default
    }
    const artwork = pokemon.sprites.other['official-artwork']
    return showShiny ? (artwork.front_shiny ?? artwork.front_default) : artwork.front_default
  }, [pokemon?.sprites, showShiny, showSprite])

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
        c1={TYPE_DATA?.[pokemon?.types?.[0]?.type?.name]?.color ?? "#383838"}
        c2={TYPE_DATA?.[pokemon?.types?.[1]?.type?.name]?.color}
      />
      {pokemon ? (
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
          
          {showSprite
            ? <PokeImgSprite src={currentHeroImage} />
            : <PokeImg src={currentHeroImage} />
          }
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

          <div style={{position: 'absolute', right: '-4px', bottom: '-4px', display: 'flex', flexDirection: 'column', gap: '4px'}}>
            <IconButton size="small" color={showSprite ? 'primary' : 'default'} onClick={() => setShowSprite(!showSprite)}>
              {showSprite ? <ImageIcon /> : <PixelateIcon />}
            </IconButton>
            <IconButton size="small" color={showShiny ? 'primary' : 'default'} onClick={() => setShowShiny(!showShiny)}>
              <MuiSvgIcon component={ShinyIcon} />
            </IconButton>
						<CryButton pokemon={pokemon} />
          </div>
        </div>
      ) : (
        <div className="flex col left" style={{width: '100%'}}>
          <Skeleton variant="text" width="40%" height={40} />
          {/* <Skeleton variant="text" width="20%" height={24} /> */}
          <TypeContainer style={{top: '32px', right: '32px', position: 'absolute'}}>
            <Skeleton variant="rounded" width={32} height={32} sx={{borderRadius: '16px'}} />
          </TypeContainer>
          <Skeleton variant="rounded" width="100%" height={290} sx={{maxWidth: 300, margin: '0 auto', borderRadius: '999px', opacity: 1.0}} />
          <div style={{display: 'flex', gap: '8px', marginTop: '8px'}}>
            <Skeleton variant="rounded" width={80} height={32} sx={{borderRadius: '16px'}} />
            <Skeleton variant="rounded" width={80} height={32} sx={{borderRadius: '16px'}} />
          </div>
        </div>
      )}
      {content}
    </HeroCardWrapper>
  )
}

export default HeroCard