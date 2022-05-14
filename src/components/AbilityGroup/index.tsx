import { Tooltip, Chip } from "@mui/material"
import { Ability, MainClient, Pokemon } from "pokenode-ts"
import { useEffect, useState } from "react"

interface AbilityGroupProps {
  api: MainClient,
  pokemon: Pokemon
}

const AbilityGroup = (props: AbilityGroupProps) => {

  const { api, pokemon } = props

  const [abilities, setAbilities] = useState<Ability[]>([])

  useEffect(() => {
    if (pokemon?.abilities?.[0]) {
      const tempAbilities = []
      Promise.all(pokemon?.abilities?.map(async (a) => {
        const name = a.ability.name
        await api.pokemon.getAbilityByName(name).then((ability) => tempAbilities.push(ability))
      }))
        .then(() => setAbilities(tempAbilities))
    } else {
      setAbilities([])
    }
  }, [pokemon])

  return (
    <div className="flex row" style={{alignItems: 'flex-start'}}>
      {abilities.map((a: Ability) => (
        <Tooltip title={a.effect_entries.find((entry) => entry?.language.name === 'en')?.short_effect}>
          <Chip color="default" style={{textTransform: 'capitalize', backgroundColor: '#565656'}} label={a.name} />
        </Tooltip>
      ))}
    </div>
  )
}

export default AbilityGroup