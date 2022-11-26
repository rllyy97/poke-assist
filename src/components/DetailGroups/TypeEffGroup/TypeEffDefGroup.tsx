import { Divider } from "@mui/material"
import { Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import { EffGroupData, getEffAtt } from "../../../utilities/typeCalc"
import TypeDefCard from "./TypeDefCard"

import { SvgIcon as MuiSvgIcon } from "@mui/material"
import ShieldIcon from '@mui/icons-material/Shield';

interface TypeEffDefGroupProps {
  pokemonName: string
  type1: Type
  type2: Type
}

const TypeEffDefGroup = (props: TypeEffDefGroupProps) => {

  const { pokemonName, type1, type2 } = props

  /////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [effGroup1, setEffGroup1] = useState<EffGroupData>({ strong: [], weak: [], immune: [] })
  const [effGroup2, setEffGroup2] = useState<EffGroupData>({ strong: [], weak: [], immune: [] })

  useEffect(() => {
    setEffGroup1(getEffAtt(type1))
    setEffGroup2(getEffAtt(type2))
  }, [type1, type2])

  /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <TypeDefCard type={type1} effGroup={effGroup1} pokemonName={pokemonName} />
      <TypeDefCard type={type2} effGroup={effGroup2} pokemonName={pokemonName} />
    </>
  )
}

export default TypeEffDefGroup
