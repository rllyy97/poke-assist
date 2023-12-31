import { Chip, SvgIcon } from "@mui/material"

import PhysicalIcon from '../../icons/moveTypes/physical-move.svg?react'
import SpecialIcon from '../../icons/moveTypes/special-move.svg?react'
import StatusIcon from '../../icons/moveTypes/status-move.svg?react'

const MoveClassChip = ({className}: {className: string}) => {

  const moveCategories = {
    physical: {
      text: 'Physical',
      icon: PhysicalIcon,
      color: 'error'
    },
    special: {
      text: 'Special',
      icon: SpecialIcon,
      color: 'info'
    },
    status: {
      text: 'Status',
      icon: StatusIcon,
      color: 'disabled'
    }
  }

  const moveCategory = moveCategories[className] ?? moveCategories.status

  return (
    <Chip
      icon={<SvgIcon component={moveCategory.icon} color={moveCategory.color} />}
      label={moveCategory.text}
    />
  )
}

export default MoveClassChip