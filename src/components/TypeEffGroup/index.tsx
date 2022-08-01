import { MainClient, Pokemon, Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import TypeEffAttGroup from "./TypeEffAttGroup"
import TypeEffDefGroup from "./TypeEffDefGroup"

interface TypeEffGroupProps {
  api: MainClient
  pokemon: Pokemon
  direction?: 'att' | 'def'
}

const TypeEffGroup = (props: TypeEffGroupProps) => {

  const { api, pokemon, direction = 'att' } = props

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// TYPES

  const [type1, setType1] = useState<Type>()
  const [type2, setType2] = useState<Type>()

  useEffect(() => {
    if (pokemon) {
      api.pokemon.getTypeByName(pokemon?.types?.[0].type.name).then((type) => setType1(type))
      if (pokemon?.types?.length > 1)
        api.pokemon.getTypeByName(pokemon?.types?.[1].type.name).then((type) => setType2(type))
      else 
        setType2(undefined)
    } else {
      setType1(undefined)
      setType2(undefined)
    }
  }, [pokemon])

  return direction === 'att'
    ? <TypeEffAttGroup type1={type1} type2={type2} /> 
    : <TypeEffDefGroup type1={type1} type2={type2} pokemonName={pokemon?.name} />
}

export default TypeEffGroup
