import { Pokemon, Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import { useApi } from "../../../store/api/apiSelectors"
import MatchupAttCard from "./MatchupAttCard"
import TypeEffDefGroup from "./TypeEffDefGroup"

import { SvgIcon as MuiSvgIcon } from "@mui/material"

import { ReactComponent as SwordIcon } from "../../../icons/sword.svg"
import ShieldIcon from '@mui/icons-material/Shield'
import { CustomDivider } from "../../../GlobalComponents"

interface TypeEffGroupProps {
  pokemon: Pokemon
}

const TypeEffGroup = (props: TypeEffGroupProps) => {
  const { pokemon } = props

  const api = useApi()

  /////////////////////////////////////////////////////////////////////////////
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
  }, [api.pokemon, pokemon])

  return (
    <div className="flex col" style={{gap: '16px'}}>
      <CustomDivider icon={<MuiSvgIcon component={SwordIcon} />} text={'ATTACKING'} />
      <MatchupAttCard type1={type1} type2={type2} pokemonName={pokemon?.name} />
      <CustomDivider icon={<MuiSvgIcon component={ShieldIcon} />} text={'DEFENDING'} />
      <TypeEffDefGroup type1={type1} type2={type2} pokemonName={pokemon?.name} />
    </div>
  )
}

export default TypeEffGroup
