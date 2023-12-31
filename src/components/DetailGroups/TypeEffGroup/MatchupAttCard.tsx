import { useState, useEffect } from "react"
import styled from "styled-components"
import { COLORS } from "../../../colors"
import { getDoubleEffDef } from "../../../utilities/typeCalc"
import TypeRow from "./TypeRow"

const MatchupCardContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  background-color: ${COLORS.card};
  overflow: hidden;
`

const MatchupCardContent = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const MatchupAttCard = (props: any) => {

  const { type1, type2, teraType } = props;

  /////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [eff4, setEff4] = useState<string[]>([])
  const [eff2, setEff2] = useState<string[]>([])
  const [, setEff1] = useState<string[]>([])
  const [effHalf, setEffHalf] = useState<string[]>([])
  const [effQuarter, setEffQuarter] = useState<string[]>([])
  const [eff0, setEff0] = useState<string[]>([])

  useEffect(() => {
    const typeEffRecords = getDoubleEffDef(teraType ?? type1, teraType ? undefined : type2)
    const entries = Object.entries(typeEffRecords)
    setEff4(entries.filter(([, v]) => v === 4).map(([k]) => k))
    setEff2(entries.filter(([, v]) => v === 2).map(([k]) => k))
    setEff1(entries.filter(([, v]) => v === 1).map(([k]) => k))
    setEffHalf(entries.filter(([, v]) => v === 0.5).map(([k]) => k))
    setEffQuarter(entries.filter(([, v]) => v === 0.25).map(([k]) => k))
    setEff0(entries.filter(([, v]) => v === 0).map(([k]) => k))
  }, [type1, type2, teraType])

  if (!type1) return <></>

  return (
    <MatchupCardContainer>
      <MatchupCardContent>
        <TypeRow value={4} label='4' types={eff4} />
        <TypeRow value={2} label='2' types={eff2} />
        {/* <TypeRow value={1} types={eff1} /> */}
        <TypeRow value={0.5} label='½' types={effHalf} />
        <TypeRow value={0.25} label='¼' types={effQuarter} />
        <TypeRow value={0} label='0' types={eff0} />
      </MatchupCardContent>
    </MatchupCardContainer>
  )
}

export default MatchupAttCard
