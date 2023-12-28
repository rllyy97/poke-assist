
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { COLORS } from "../../colors"
import { Typography } from '@mui/material';


const StatChangeChips = ({ statChance, statChanges = [], target }) => {

  const STAT_NAMES = {
    'hp': 'HP',
    'attack': 'Atk',
    'defense': 'Def',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    'speed': 'Spe',
    'evasion': 'Eva',
  }

  const disabled = statChanges.length === 0

  if (disabled) return <></>

  return (
    <div className={"flex row left"}>
      {statChanges.map((s, i) => {
        // add a plus sign if the change is positive, for each level
        const icons = s.change > 0 
          ? Array.from({length: s.change}, () => <KeyboardArrowUpIcon style={{margin: -4}} />) 
          : Array.from({length: Math.abs(s.change)}, () => <KeyboardArrowDownIcon style={{margin: -4}} />)
          
        const percentChance = statChance != 100 && statChance != 0 ? ` (${statChance}%)` : undefined
        return (
          <div 
            key={i} 
            className={"flex row"} 
            style={{
              borderRadius: '32px',
              padding: '2px 12px',
              backgroundColor: s.change > 0 ? COLORS[2] : COLORS[0.5],
              gap: '0',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {STAT_NAMES[s.stat.name]}
            {icons && <span style={{display: 'inherit', margin: '0 8px'}}>{icons}</span>}
            {/* {icons} */}
            {percentChance}
          </div>
        )
      })}
    </div>
  )
}

export default StatChangeChips
