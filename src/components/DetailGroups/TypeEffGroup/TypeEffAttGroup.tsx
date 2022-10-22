import { Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import { getDoubleEffDef } from "../../../utilities/typeCalc"
import TypeRow from "./TypeRow"

interface TypeEffAttGroupProps {
  type1: Type
  type2: Type
}

const TypeEffAttGroup = (props: TypeEffAttGroupProps) => {

  const { type1, type2 } = props

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [eff4, setEff4] = useState<string[]>([])
  const [eff2, setEff2] = useState<string[]>([])
  const [, setEff1] = useState<string[]>([])
  const [effHalf, setEffHalf] = useState<string[]>([])
  const [effQuarter, setEffQuarter] = useState<string[]>([])
  const [eff0, setEff0] = useState<string[]>([])

  useEffect(() => {
    const typeEffRecords = getDoubleEffDef(type1, type2)
    const entries = Object.entries(typeEffRecords)
    setEff4(entries.filter(([, v]) => v === 4).map(([k]) => k))
    setEff2(entries.filter(([, v]) => v === 2).map(([k]) => k))
    setEff1(entries.filter(([, v]) => v === 1).map(([k]) => k))
    setEffHalf(entries.filter(([, v]) => v === 0.5).map(([k]) => k))
    setEffQuarter(entries.filter(([, v]) => v === 0.25).map(([k]) => k))
    setEff0(entries.filter(([, v]) => v === 0).map(([k]) => k))
  }, [type1, type2])

  /////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex column left">
      <TypeRow num='4' types={eff4} />
      <TypeRow num='2' types={eff2} />
      {/* <TypeRow num='1' types={eff1} /> */}
      <TypeRow num='½' types={effHalf} />
      <TypeRow num='¼' types={effQuarter} />
      <TypeRow num='0' types={eff0} />
    </div>
  )
}

export default TypeEffAttGroup
