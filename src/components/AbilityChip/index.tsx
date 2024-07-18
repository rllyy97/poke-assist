import { Tooltip, Chip, Badge } from "@mui/material"
import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useApi } from "../../store/api/apiSelectors"


const AbilityChip = (props: any) => {
  const { id, name, isHiddenAbility = false } = props

  const api = useApi()

  const {
		data,
		isFetching,
	} = useQuery(
    ['abilities', id],
    () => api.pokemon.getAbilityById(id),
    { staleTime: 1000 * 60 * 60 * 24 }
  )

  const [isTooltipOpen, setIsTooltipOpen] = useState(false)

	const effectString = useMemo(() => {
		if (!data) return ''
		const effect = data.effect_entries.find((entry) => entry.language.name === 'en')?.short_effect
		const flavor = data.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text
		return effect ?? flavor;
	}, [data]);

  if (isFetching)
    return (
      <Chip 
        key={name} 
        style={{textTransform: 'capitalize'}} 
        label={name} 
      />
    )

  return (
    <Badge color="primary" variant="dot" invisible={!isHiddenAbility}>
      <Tooltip
        arrow
        title={effectString}
        onClose={() => setIsTooltipOpen(false)}
        onOpen={() => setIsTooltipOpen(true)}
        open={isTooltipOpen}
      >
        <Chip 
          key={name} 
          style={{textTransform: 'capitalize'}} 
          label={name}
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        />
      </Tooltip>
    </Badge>
  )
}

export default AbilityChip
