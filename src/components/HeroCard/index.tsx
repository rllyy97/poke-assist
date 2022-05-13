import { Pokemon } from "pokenode-ts"
import { PokeImg } from "../../styles"
import { TypeData } from "../../typeData"
import TypeChip from "../TypeChip"
import { AbilityContainer, HeroCardWrapper, PsuedoBorder, TypeContainer } from "./styles"

import { MainClient } from 'pokenode-ts'

import VanillaTilt from 'vanilla-tilt'
import { useEffect, useRef } from "react"
import AbilityGroup from "../AbilityGroup"

interface HeroCardProps {
  api: MainClient
  pokemon: Pokemon
}

const HeroCard = (props: HeroCardProps) => {
  const { api, pokemon } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    VanillaTilt.init(ref.current, {
      // reverse: true,
      max: 8,
      scale: 1.05,
      // glare: true,
      // "max-glare": 0.3,
      gyroscope: true,
    })
  }, []);

  if (!pokemon) return <></>

  return (
    <HeroCardWrapper ref={ref}>
      <PsuedoBorder
        c1={TypeData?.[pokemon.types?.[0]?.type?.name]?.color}
        c2={TypeData?.[pokemon.types?.[1]?.type?.name]?.color}
      />
      <h1 style={{textTransform: 'capitalize', padding: '8px 0px'}}>
        {pokemon.name}
      </h1>
      <TypeContainer>
        {pokemon.types?.[0] && <TypeChip type={pokemon.types?.[0]?.type.name} /> }
        {pokemon.types?.[1] && <TypeChip type={pokemon.types?.[1]?.type.name} /> }
      </TypeContainer>
      <AbilityContainer>
        <AbilityGroup api={api} pokemon={pokemon} />
      </AbilityContainer>
      <PokeImg src={pokemon.sprites.other['official-artwork'].front_default} />
      
    </HeroCardWrapper>
  )
}

export default HeroCard