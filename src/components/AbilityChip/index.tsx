import { Tooltip, Chip, Badge } from "@mui/material"
import { useQuery } from "react-query"
import { useApi } from "../../store/api/apiSelectors"


const AbilityChip = (props: any) => {
  const { name, isHiddenAbility = false } = props

  const api = useApi()

  const abilityQuery = useQuery(
    ['abilities', name],
    () => api.pokemon.getAbilityByName(name.replace(' ', '-')),
    { staleTime: 1000 * 60 * 60 * 24 }
  )

  if (abilityQuery.isLoading)
    return (
      <Chip 
        key={name} 
        style={{textTransform: 'capitalize'}} 
        label={name} 
      />
    )

  return (
    <Tooltip
      arrow
      title={abilityQuery.data.effect_entries.find((entry) => entry?.language.name === 'en')?.short_effect}
    >
      <Badge color="primary" variant="dot" invisible={!isHiddenAbility}>
        <Chip 
          key={name} 
          style={{textTransform: 'capitalize'}} 
          label={abilityQuery.data.name} 
        />
      </Badge>
    </Tooltip>
  )
}

export default AbilityChip