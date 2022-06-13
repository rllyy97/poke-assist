import { Pokemon, PokemonAbility } from "pokenode-ts"
import { PokeImg } from "../../styles"
import { TypeData } from "../../typeData"
import { HeroCardWrapper, PsuedoBorder, TypeContainer } from "./styles"

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
}

const HeroCard = (props: HeroCardProps) => {
  const { api, pokemon, content } = props
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

  return (
    <HeroCardWrapper ref={ref}>
      <PsuedoBorder
        c1={TypeData?.[pokemon.types?.[0]?.type?.name]?.color}
        c2={TypeData?.[pokemon.types?.[1]?.type?.name]?.color}
      />
      <h1 className="float" style={{textTransform: 'capitalize', padding: '0px 8px', maxWidth: 'calc(100%-160px)'}}>
        {pokemon.name}
      </h1>
      {/* <Divider style={{width: '100%'}} /> */}
      <TypeContainer className="float">
        {pokemon.types?.[0] && <TypeDot type={pokemon.types?.[0]?.type.name} /> }
        {pokemon.types?.[1] && <TypeDot type={pokemon.types?.[1]?.type.name} /> }
      </TypeContainer>
      <PokeImg className="float fMore" src={pokemon.sprites.other['official-artwork'].front_default} />
      <ChipRow>
        {pokemon?.abilities?.map((a: PokemonAbility) => (
          <AbilityChip key={a.ability.name} api={api} name={a.ability.name} />
        ))}
      </ChipRow>

      {content}
    </HeroCardWrapper>
  )
}

export default HeroCard