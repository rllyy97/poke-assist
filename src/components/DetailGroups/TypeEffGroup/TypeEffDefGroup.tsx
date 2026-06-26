import { Type } from "pokenode-ts"
import { useMemo } from "react"
import styled from "styled-components"
import { COLORS } from "../../../colors"
import { TYPE_DATA } from "../../../typeData"
import { getEffAtt } from "../../../utilities/typeCalc"
import { TYPE_EFF, TypeEffectiveness } from "../../../types"
import TypeDot from "../../TypeDot"
import EffDot from "../../TypeGrid/effDot"

const GridContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.card};
  overflow: hidden;
  padding: 12px;
`

const Cell = styled.div<{ compact?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.compact ? '24px' : '36px'};
  height: ${p => p.compact ? '24px' : '36px'};
  flex: 0 0 ${p => p.compact ? '24px' : '36px'};
  box-sizing: border-box;
`

const GridRow = styled.div`
  display: flex;
  align-items: center;
`

interface TypeEffDefGroupProps {
  pokemonName: string
  type1: Type
  type2: Type
  teraType: Type
}

const TypeEffDefGroup = (props: TypeEffDefGroupProps) => {
  const { type1, type2, teraType } = props

  const gridData = useMemo(() => {
    const attackTypes: Type[] = []
    if (teraType && teraType.name !== type1?.name && teraType.name !== type2?.name) {
      attackTypes.push(teraType)
    }
    if (type1) attackTypes.push(type1)
    if (type2) attackTypes.push(type2)

    if (attackTypes.length === 0) return null

    // Get effectiveness data for each attacking type
    const rows = attackTypes.map(t => ({
      type: t,
      eff: getEffAtt(t),
    }))

    // Find all defending types that have a non-neutral interaction with ANY attacking type
    const allDefTypes = Object.keys(TYPE_DATA)
    const relevantDefTypes = allDefTypes.filter(defType =>
      rows.some(row =>
        row.eff.strong.includes(defType) ||
        row.eff.weak.includes(defType) ||
        row.eff.immune.includes(defType)
      )
    )

    // Build effectiveness lookup for each row × column
    const getEff = (row: typeof rows[0], defType: string): TypeEffectiveness | undefined => {
      if (row.eff.strong.includes(defType)) return TYPE_EFF.STRONG
      if (row.eff.weak.includes(defType)) return TYPE_EFF.WEAK
      if (row.eff.immune.includes(defType)) return TYPE_EFF.IMMUNE
      return undefined
    }

    return { rows, relevantDefTypes, getEff }
  }, [type1, type2, teraType])

  if (!gridData || gridData.relevantDefTypes.length === 0) return null

  const { rows, relevantDefTypes, getEff } = gridData
  const compact = relevantDefTypes.length > 11

  return (
    <GridContainer>
      {/* Header row: empty cell + defending type dots */}
      <GridRow>
        <Cell compact={compact} />
        {relevantDefTypes.map(defType => (
          <Cell key={defType} compact={compact}>
            <TypeDot type={defType} variant="square" size={compact ? 'small' : 'medium'} />
          </Cell>
        ))}
      </GridRow>
      {/* One row per attacking type */}
      {rows.map(row => (
        <GridRow key={row.type.name}>
          <Cell compact={compact}>
            <TypeDot type={row.type.name} variant="square" size={compact ? 'small' : 'medium'} />
          </Cell>
          {relevantDefTypes.map(defType => (
            <Cell key={defType} compact={compact}>
              <EffDot eff={getEff(row, defType)} size={compact ? 'small' : 'medium'} />
            </Cell>
          ))}
        </GridRow>
      ))}
    </GridContainer>
  )
}

export default TypeEffDefGroup
