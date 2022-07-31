import { MainClient, Pokemon, Type } from "pokenode-ts"
import { useState, useEffect } from "react"
import TypeDot from "../TypeDot"

interface TypeEffGroupProps {
  api: MainClient
  pokemon: Pokemon
}

const TypeEffGroup = (props: TypeEffGroupProps) => {

  const { api, pokemon } = props

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

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [eff4, setEff4] = useState<string[]>([])
  const [eff2, setEff2] = useState<string[]>([])
  const [eff1, setEff1] = useState<string[]>([])
  const [effHalf, setEffHalf] = useState<string[]>([])
  const [effQuarter, setEffQuarter] = useState<string[]>([])
  const [eff0, setEff0] = useState<string[]>([])

  useEffect(() => {

    // STRONG
    const t1strong = type1?.damage_relations?.double_damage_from?.map(t => t.name) ?? []
    const t2strong = type2?.damage_relations?.double_damage_from?.map(t => t.name) ?? []
    // WEAK
    const t1weak = type1?.damage_relations?.half_damage_from?.map(t => t.name) ?? []
    const t2weak = type2?.damage_relations?.half_damage_from?.map(t => t.name) ?? []
    // IMMUNE
    const t1immune = type1?.damage_relations?.no_damage_from?.map(t => t.name) ?? []
    const t2immune = type2?.damage_relations?.no_damage_from?.map(t => t.name) ?? []

    if (!type2) {
      setEff4([])
      setEff2(t1strong)
      setEff1([])
      setEffHalf(t1weak)
      setEffQuarter([])
      setEff0(t1immune)
    } else {

      const temp4 = t1strong.filter((t) => t2strong.includes(t))
      const temp2 = []
      const temp1 = []
      const tempHalf = []
      const tempQuarter = t1weak.filter((t) => t2weak.includes(t))
      const temp0 = [...t1immune, ...t2immune]

      const f0 = (arr: string[]) => arr.filter((t) => !temp0.includes(t))
      
      t1strong.forEach(t => t2weak.includes(t) ? temp1.push(t) : temp2.push(t))
      t2strong.forEach(t => t1weak.includes(t) ? temp1.push(t) : temp2.push(t))
      t1weak.forEach(t => t2strong.includes(t) ? temp1.push(t) : tempHalf.push(t))
      t2weak.forEach(t => t1strong.includes(t) ? temp1.push(t) : tempHalf.push(t))

      setEff4(f0(temp4))
      setEff2(f0(temp2.filter((t) => !temp4.includes(t))))
      setEff1(f0([...new Set(temp1)]))
      setEffHalf(f0(tempHalf.filter((t) => !tempQuarter.includes(t))))
      setEffQuarter(f0(tempQuarter))
      setEff0([...t1immune, ...t2immune])
    }
  }, [type1, type2])

  /////////////////////////////////////////////////////////////////////////////////////////////////

  const TypeRow = (props) => (
    <>
      {props.types.length > 0 &&
        <div className="flex" style={{margin: '4px 0px'}}>
          <h3 style={{width: '40px'}}>{props.num} ×</h3>
          <div className="flex left" style={{flex: '1 1 0%'}}>
            {props.types.map((t) => <TypeDot key={t} type={t} />)}
          </div>
        </div>
      }
    </>
  )

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

export default TypeEffGroup
