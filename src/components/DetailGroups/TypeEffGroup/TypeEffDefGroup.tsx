import { Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import { EffGroupData, getEffAtt } from "../../../utilities/typeCalc"
import TypeDefCard from "./TypeDefCard"

interface TypeEffDefGroupProps {
  pokemonName: string
  type1: Type
  type2: Type
  teraType: Type
}

const TypeEffDefGroup = (props: TypeEffDefGroupProps) => {

  const { pokemonName, type1, type2, teraType } = props

  /////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [effGroup1, setEffGroup1] = useState<EffGroupData>({ strong: [], weak: [], immune: [], normal: [] })
  const [effGroup2, setEffGroup2] = useState<EffGroupData>({ strong: [], weak: [], immune: [], normal: [] })
  const [effGroupTera, setEffGroupTera] = useState<EffGroupData>({ strong: [], weak: [], immune: [], normal: [] })

  useEffect(() => {
    setEffGroup1(getEffAtt(type1))
    setEffGroup2(getEffAtt(type2))
    setEffGroupTera(getEffAtt(teraType))
  }, [type1, type2, teraType])

  /////////////////////////////////////////////////////////////////////////////

  const type1match = type1?.name === teraType?.name
  const type2match = type2?.name === teraType?.name

  return (
    <>
      {!type1match && !type2match && (
        <TypeDefCard type={teraType} effGroup={effGroupTera} pokemonName={pokemonName} />
      )}
      <TypeDefCard type={type1} effGroup={effGroup1} pokemonName={pokemonName} teraBoosted={type1match} />
      <TypeDefCard type={type2} effGroup={effGroup2} pokemonName={pokemonName} teraBoosted={type2match} />
    </>
  )
}

export default TypeEffDefGroup
