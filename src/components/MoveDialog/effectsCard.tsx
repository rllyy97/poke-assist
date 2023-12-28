import styled from "styled-components"
import { COLORS } from "../../colors"
import ExposureIcon from '@mui/icons-material/Exposure'
import { MoveProperty } from './index'
import StatChangeChips from "./statChangeChips"


const CardContainer = styled.div`
  background-color: ${COLORS.cardDark};
  border-radius: 4px;
`

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-weight: bold;
  font-family: monospace;
  margin: 0px auto;
  width: -moz-available;
  margin: 0 12px 12px;
`

const EffectsCard = ({ move }) => {

  const {
    crit_rate,
    drain,
    flinch_chance,
    healing,
    ailment,
    ailment_chance,
    min_turns,
    max_turns,
  } = move?.meta

  const EffectChip = ({text, icon = undefined, negative = false}) => (
    <div 
      className={"flex row"} 
      style={{
        borderRadius: '32px',
        padding: '2px 12px',
        backgroundColor: negative ? COLORS[0.5] : COLORS[2],
        gap: '0',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: '14px',
        textTransform: 'capitalize',
      }}
    >
      <span>{text}</span>
      {icon && <span style={{marginLeft: '8px'}}>{icon}</span>}
    </div>
  )

  let ailmentString = (ailment?.name && ailment.name != 'none') ? ailment.name : ''
  if (ailment_chance > 0 && ailment_chance < 100) ailmentString += ` (${ailment_chance}%)`
  if (min_turns > 0 && max_turns > 0) 
    if (min_turns != max_turns) ailmentString += ` (${min_turns}-${max_turns} turns)`
    else ailmentString += ` (${min_turns} turns)`

  const critRateString = `Crit Rate: ${crit_rate > 0 ? '+'+crit_rate : crit_rate}`
  

  return (
    <CardContainer>
      <MoveProperty icon={<ExposureIcon />} name="Effects" />
      <ContentContainer>
        {crit_rate > 0 && <EffectChip text={critRateString} />}
        {drain > 0 && <EffectChip text={`Drain: ${drain}%`} />}
        {drain < 0 && <EffectChip text={`Recoil: ${Math.abs(drain)}%`} negative />}
        {flinch_chance > 0 && <EffectChip text={`Flinch (${flinch_chance}%)`} />}
        {healing > 0 && <EffectChip text={`Healing: ${healing}%`} />}
        {ailment?.name && ailment.name != 'none' && <EffectChip text={ailmentString} />}
        <StatChangeChips statChance={move.meta.stat_chance} statChanges={move.stat_changes} target={move.target} />
      </ContentContainer>
    </CardContainer>
  )
}

export default EffectsCard