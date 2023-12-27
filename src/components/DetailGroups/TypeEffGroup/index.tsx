import { Pokemon, Type } from "pokenode-ts"
import { useState, useEffect, useCallback, useMemo } from "react"
import { useApi } from "../../../store/api/apiSelectors"
import MatchupAttCard from "./MatchupAttCard"
import TypeEffDefGroup from "./TypeEffDefGroup"

import { Chip, Dialog, SvgIcon as MuiSvgIcon } from "@mui/material"

import SwordIcon from "../../../icons/sword.svg?react"
import TeraIcon from "../../../icons/teraIcon.svg?react"
import TeraEndcap from "../../../icons/teraEndcap.svg?react"
import ShieldIcon from '@mui/icons-material/Shield'
import { CustomDivider, SvgIcon } from "../../../GlobalComponents"
import { TYPE_DATA } from "../../../typeData"
import TypeDot from "../../TypeDot"
import { COLORS } from "../../../colors"

interface TypeEffGroupProps {
  pokemon: Pokemon
}

const TypeEffGroup = (props: TypeEffGroupProps) => {
  const { pokemon } = props

  const api = useApi()

  const [showTeraSelection, setShowTeraSelection] = useState(false)
  const [teraType, setTeraType] = useState<Type | undefined>()

  /////////////////////////////////////////////////////////////////////////////
  /// TYPES

  const [type1, setType1] = useState<Type>()
  const [type2, setType2] = useState<Type>()

  useEffect(() => setTeraType(undefined), [pokemon]);

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
  }, [api.pokemon, pokemon, teraType])

  const teraCallback = useCallback(async (type?: string) => {
    if (!type) setTeraType(undefined)
    else setTeraType(await api.pokemon.getTypeByName(type))
    setShowTeraSelection(false)
  }, [api.pokemon])

  const teraTypeIcon = useMemo(() => {
    if (!teraType) return <MuiSvgIcon component={TeraIcon} />
    const src = TYPE_DATA[teraType.name].icon
    return <SvgIcon src={src} style={{padding: '4px', transform: 'translate(6px, 0px)'}} />
  }, [teraType])

  const TeraCap = (props: any) => (
    <TeraEndcap style={{
      position: 'absolute', 
      top: '-8px', 
      left: props.flip ? '' : '-12px', 
      right: props.flip ? '-12px' : '',
      fill: props.fill, 
      width: '48px',
      height: '48px',
      transform: props.flip ? 'rotate(180deg)' : '',
    }} />
  )

  const TeraButton = () => {
    const backgroundColor = teraType ? TYPE_DATA[teraType.name].color : COLORS.card
    const capColor = teraType ? TYPE_DATA[teraType.name].color : COLORS.background
    return (
      <div style={{position: 'absolute', top: '2px', left: '0px'}}>
        <TeraCap fill={capColor} />
        <TeraCap fill={capColor} flip />
        <Chip
          icon={teraTypeIcon}
          onClick={() => setShowTeraSelection(!showTeraSelection)}
          label={teraType ? `Tera ${teraType.name}` : 'Terastallize'}
          color={teraType ? 'primary' : 'default'}
          style={{ textTransform: 'capitalize',  fontWeight: 'bold', backgroundColor, }}
        />
      </div>
    )
  }

  const TeraDialog = () => (
    <Dialog open={showTeraSelection} onClose={() => setShowTeraSelection(false)}>
      <div className="flex col" style={{padding: '16px', width: '300px'}}>
        <div className="flex row" style={{paddingBottom: '12px'}}>
          <MuiSvgIcon component={TeraIcon} fontSize={'large'} />
          <h2>Select a Tera Type</h2>
        </div>
        <div className="flex row" style={{gap: '12px'}}>
          {/* Icon buttons for each type, when clicked it sets the tera type */}
          {Object.keys(TYPE_DATA).map((type, i) => (
            <TypeDot key={i} type={type} onClick={() => teraCallback(type)}>{type}</TypeDot>
          ))}
          <Chip label={'None'} onClick={() => teraCallback()} />
        </div>
      </div>
    </Dialog>
  )

  return (
    <div className="flex col" style={{gap: '16px', position: 'relative'}}>
      <CustomDivider icon={<MuiSvgIcon component={SwordIcon} />} text={'ATTACKING'} />
      <MatchupAttCard type1={type1} type2={type2} teraType={teraType} pokemonName={pokemon?.name} />
      <CustomDivider icon={<MuiSvgIcon component={ShieldIcon} />} text={'DEFENDING'} />
      <TypeEffDefGroup type1={type1} type2={type2} teraType={teraType} pokemonName={pokemon?.name} />
      <TeraButton />
      <TeraDialog />
    </div>
  )
}

export default TypeEffGroup
