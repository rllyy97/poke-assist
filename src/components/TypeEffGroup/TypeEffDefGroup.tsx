import { Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import { EffGroupData, getEffAtt } from "../../utilities/typeCalc"
import TypeDefCard from "../TypeEffGroup/TypeDefCard"

interface TypeEffDefGroupProps {
  pokemonName: string
  type1: Type
  type2: Type
}

const TypeEffDefGroup = (props: TypeEffDefGroupProps) => {

  const { pokemonName, type1, type2 } = props

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [effGroup1, setEffGroup1] = useState<EffGroupData>({ strong: [], weak: [], immune: [] })
  const [effGroup2, setEffGroup2] = useState<EffGroupData>({ strong: [], weak: [], immune: [] })

  useEffect(() => {
    setEffGroup1(getEffAtt(type1))
    setEffGroup2(getEffAtt(type2))
  }, [type1, type2])

  /////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex column left">
      <TypeDefCard type={type1} effGroup={effGroup1} pokemonName={pokemonName} />
      <TypeDefCard type={type2} effGroup={effGroup2} pokemonName={pokemonName} />
    </div>
  )
}

export default TypeEffDefGroup
