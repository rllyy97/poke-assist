import { Tooltip, Chip, TooltipProps } from "@mui/material"
import { Nature, PokemonClient } from "pokenode-ts"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { FormatStatString } from "../../utilities/stringManipulation"

import PlusIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'

// const NatureTooltip = styled(Tooltip)`
//   * > .MuiTooltip-tooltip {
//     padding: 4px;
//     border-radius: 50px;
//   }
// `

const NatureTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    padding: "0px",
    borderRadius: "50px",
    background: 'none'
  }
}));

const NatureChip = (props: any) => {

  const { api, name } = props

  const [nature, setNature] = useState<Nature>()

  useEffect(() => {
    const natureClient: PokemonClient = api?.pokemon ?? new PokemonClient()
    natureClient.getNatureByName(name).then((n) => setNature(n))
  }, [api, name])

  if (!nature) return null

  return (
    <NatureTooltip
      // arrow
      title={(
        <div className="flex row">
          <Chip
            key={nature.increased_stat.name}
            icon={<PlusIcon />}
            size="small"
            color="success"
            label={FormatStatString(nature.increased_stat.name)}
          />
          <Chip
            key={nature.decreased_stat.name}
            icon={<MinusIcon />}
            size="small"
            color="error"
            label={FormatStatString(nature.decreased_stat.name)}
          />
        </div>
      )}
    >
      <Chip key={nature.id} style={{textTransform: 'capitalize'}} label={nature.name} />
    </NatureTooltip>
  )
}

export default NatureChip