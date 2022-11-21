import { Pokemon, PokemonAbility } from "pokenode-ts"
import { PokeImg } from "../../styles"
import { TYPE_DATA } from "../../typeData"
import { HeroCardWrapper, PsuedoBorder, SpeciesName, TypeContainer, VariantName } from "./styles"
import CircularProgress from '@mui/material/CircularProgress';

import TypeDot from "../TypeDot"
import AbilityChip from "../AbilityChip"
import ChipRow from "../ChipRow"
import { IdFromUrl } from "../../utilities/stringManipulation"
import ShinyButton from "../ShinyButton";

interface HeroCardProps {
  isLoading?: boolean
  pokemon: Pokemon
  content?: any
  speciesName?: string
}

const HeroCard = (props: HeroCardProps) => {
  const { isLoading, pokemon, content, speciesName } = props

  const variantName = pokemon?.name.split(`${speciesName}-`)[1] ?? ''
  
  return (
    <HeroCardWrapper>
      <PsuedoBorder
        c1={TYPE_DATA?.[pokemon?.types?.[0]?.type?.name]?.color}
        c2={TYPE_DATA?.[pokemon?.types?.[1]?.type?.name]?.color}
      />
      {pokemon && (
        <>
          <SpeciesName className="float">
            {speciesName}
          </SpeciesName>
          <VariantName>
            #{IdFromUrl(pokemon.species.url)}{variantName && ` - ${variantName}`}
          </VariantName>
          {/* <Divider style={{width: '100%'}} /> */}
          <TypeContainer className="float">
            {pokemon.types?.[0] && <TypeDot type={pokemon.types?.[0]?.type.name} /> }
            {pokemon.types?.[1] && <TypeDot type={pokemon.types?.[1]?.type.name} /> }
          </TypeContainer>
          {isLoading && <CircularProgress /> }
          
          <PokeImg className="float fMore" src={pokemon.sprites.other['official-artwork'].front_default} />
          <ChipRow>
            {pokemon?.abilities?.map((a: PokemonAbility) => (
              <AbilityChip key={a.ability.name} name={a.ability.name} isHiddenAbility={a.is_hidden} />
            ))}
          </ChipRow>
          <div style={{position: 'absolute', right: '12px', bottom: '12px'}}>
            <ShinyButton />
          </div>
        </>
      )}
      {content}
    </HeroCardWrapper>
  )
}

export default HeroCard