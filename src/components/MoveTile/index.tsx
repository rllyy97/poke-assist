import { Chip, IconButton, SvgIcon, Tooltip } from "@mui/material"
import { MainClient, Move, MoveClient } from "pokenode-ts"
import { useEffect, useState } from "react"
import TypeDot from "../TypeDot"

import SwitchIcon from '@mui/icons-material/Autorenew'

import { ReactComponent as PhysicalIcon } from '../../icons/moveTypes/physical-move.svg'
import { ReactComponent as SpecialIcon } from '../../icons/moveTypes/special-move.svg'
import { ReactComponent as StatusIcon } from '../../icons/moveTypes/status-move.svg'


interface MoveTileProps {
  api: MainClient
  nameArray: string[]
}

const MoveTile = (props: MoveTileProps) => {
  const { api, nameArray } = props

  const [moveIndex, setMoveIndex] = useState<number>(0)
  const [move, setMove] = useState<Move>()

  const name = nameArray[moveIndex]

  const handleMoveSwitch = () => {
    setMoveIndex((moveIndex + 1) % nameArray.length)
  }

  useEffect(() => {
    const moveClient = (api as MainClient).move ?? new MoveClient()
    moveClient.getMoveByName(name.replace(' ', '-')).then((m) => setMove(m))
  }, [api, name])

  if (!move) return <p>Could not find: {name}</p>

  const { power, damage_class, meta, effect_entries, effect_chance } = move
  const numHitsString = meta?.max_hits > 1 ? ` * ${meta?.min_hits}-${meta?.max_hits}` : ''
  const powerString = `${power}${numHitsString} BP`

  const effectString = effect_entries[0]?.effect.replaceAll('$effect_chance', effect_chance?.toString())

  const moveCategoryIcon = damage_class.name === 'physical'
    ? PhysicalIcon
    : damage_class.name === 'special'
      ? SpecialIcon
      : StatusIcon

  const moveCategoryColor = damage_class.name === 'physical'
    ? "error"
    : damage_class.name === 'special'
      ? "info"
      : "action"

  return (
    <div className="flex row" style={{gap: '12px'}}>
      {nameArray.length > 1 && (
        <IconButton size="small" color="info" onClick={handleMoveSwitch}>
          <SwitchIcon />
        </IconButton>
      )}

      <TypeDot type={move.type.name} />
      <Tooltip
        arrow
        title={effectString}
        placement="bottom-start"
        enterDelay={500}
      >
        <h3 onClick={() => console.log(move)} style={{textTransform: 'capitalize'}}>
          {move.name.replace('-', ' ')}
        </h3>
      </Tooltip>
      <SvgIcon component={moveCategoryIcon} color={moveCategoryColor} />
      {move.power !> 0 && <Chip size="small" label={powerString} style={{textTransform: 'capitalize'}}/>}
      {move.accuracy !> 0 && <Chip size="small" label={move.accuracy + '% Acc'} />}
      {/* {move?.pp !> 0 && <Chip label={move.pp + ' PP'} />} */}
      {move.priority !> 0 && <Chip size="small" label={'Priority ' + move.priority} />}
      {move.effect_entries?.length > 0 && (
        <p style={{fontSize: '12px'}}>
          
        </p>
      )}
    </div>
  )
}

export default MoveTile
