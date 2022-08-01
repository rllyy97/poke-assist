import { Pokemon, PokemonAbility } from "pokenode-ts"
import { PokeImg } from "../../styles"
import { TYPE_DATA } from "../../typeData"
import { HeroCardWrapper, PsuedoBorder, SpeciesName, TypeContainer, VariantName } from "./styles"

import { MainClient } from 'pokenode-ts'
import VanillaTilt from 'vanilla-tilt'

import { useEffect, useRef } from "react"
import TypeDot from "../TypeDot"
import AbilityChip from "../AbilityChip"
import ChipRow from "../ChipRow"

interface HeroCardProps {
  api: MainClient
  pokemon: Pokemon
  content?: any
  speciesName?: string
}

const HeroCard = (props: HeroCardProps) => {
  const { api, pokemon, content, speciesName } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    VanillaTilt.init(ref.current, {
      // reverse: true,
      max: 10,
      // scale: 1.02,
      // glare: true,
      // "max-glare": 0.3,
      // "full-page-listening": true,
      gyroscope: false,
    })
  }, [])


  if (!pokemon) return <></>

  const variantName = pokemon.name.split(`${speciesName}-`)[1]
  
  return (
    <HeroCardWrapper ref={ref}>
      <PsuedoBorder
        c1={TYPE_DATA?.[pokemon.types?.[0]?.type?.name]?.color}
        c2={TYPE_DATA?.[pokemon.types?.[1]?.type?.name]?.color}
      />
      <SpeciesName className="float">
        {speciesName}
      </SpeciesName>
      <VariantName>
        {variantName}
      </VariantName>
      {/* <Divider style={{width: '100%'}} /> */}
      <TypeContainer className="float">
        {pokemon.types?.[0] && <TypeDot type={pokemon.types?.[0]?.type.name} /> }
        {pokemon.types?.[1] && <TypeDot type={pokemon.types?.[1]?.type.name} /> }
      </TypeContainer>
      <PokeImg className="float fMore" src={pokemon.sprites.other['official-artwork'].front_default} />
      <ChipRow>
        {pokemon?.abilities?.map((a: PokemonAbility) => (
          <AbilityChip key={a.ability.name} api={api} name={a.ability.name} isHiddenAbility={a.is_hidden} />
        ))}
      </ChipRow>

      {content}
    </HeroCardWrapper>
  )
}

export default HeroCard