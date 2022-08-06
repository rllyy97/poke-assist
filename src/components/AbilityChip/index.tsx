import { Tooltip, Chip, Badge } from "@mui/material"
import { Ability, PokemonClient } from "pokenode-ts"
import { useEffect, useState } from "react"


const AbilityChip = (props: any) => {

  const { api, name, isHiddenAbility = false } = props

  const [ability, setAbility] = useState<Ability>()

  useEffect(() => {
    const abilityClient = api?.pokemon ?? new PokemonClient()
    abilityClient.getAbilityByName(name.replace(' ', '-')).then((ability) => setAbility(ability))
  }, [api, name])

  if (!ability) return null

  return (
    <Tooltip
      arrow
      title={ability.effect_entries.find((entry) => entry?.language.name === 'en')?.short_effect}
    >
      <Badge color="primary" variant="dot" invisible={!isHiddenAbility}>
        <Chip key={ability.id} style={{textTransform: 'capitalize'}} label={ability.name} />
      </Badge>
    </Tooltip>
  )
}

export default AbilityChip