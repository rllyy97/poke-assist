import { ChainLink, EvolutionDetail, PokemonSpecies } from "pokenode-ts"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useApi } from "../../../store/api/apiSelectors"
import { CapitalizeFirstLetter, FormatString, IdFromSpeciesUrl, IdFromUrl, SpriteUrlFromId } from "../../../utilities/stringManipulation"
import EvoDetail from "./EvoDetail"

import { EvoSprite, Flex } from "./styles"
import { setSelectedPokemon } from "../../../store/appStatus/appStatusSlice"


interface EvolutionGroupProps {
  pokemon: PokemonSpecies
}

const EvolutionGroup = (props: EvolutionGroupProps) => {
  const { pokemon } = props

  const api = useApi()

  const dispatch = useDispatch();

  const [evoChain, setEvoChain] = useState<ChainLink>()

  useEffect(() => {
    const evoId = IdFromUrl(pokemon?.evolution_chain?.url)
    api.evolution.getEvolutionChainById(parseInt(evoId)).then((ec) => setEvoChain(ec.chain))
  }, [api, pokemon]);

  if (evoChain?.evolves_to.length === 0) return null

  const GenerateEvo = (evo: ChainLink): JSX.Element => {
    if (!evo) return
    const id = IdFromSpeciesUrl(evo.species.url)
    const name = evo.species.name
    const imgUrl = SpriteUrlFromId(id)
    const evoDetails = (evo as any).evolution_details

    const locations = evoDetails
      .map((d: EvolutionDetail) => FormatString(d?.location?.name))
      .filter((l) => l)
    let parsedEvoDetails = evoDetails.filter((d: EvolutionDetail) => !d?.location)
    if (locations.length !== 0) {
      parsedEvoDetails.push({ location: { name: locations.join(', ') } })
    }

    return (
      <Flex dir='row' key={id}>
        <Flex dir='column' style={{margin: '8px 0px'}}>
          {parsedEvoDetails.map((d: EvolutionDetail) => (
            <EvoDetail detail={d} key={id} />
          ))}
        </Flex>
        <Flex dir='column'>
          <EvoSprite
            src={imgUrl}
            alt={name}
            onClick={() => dispatch(setSelectedPokemon(id))}
          />
        </Flex>
        <Flex dir='column'>
          {evo.evolves_to.map((e) => GenerateEvo(e))}
        </Flex>
      </Flex>
    )
  }

  return (
    <div className="card fullwidth" style={{padding: '8px 0px'}}>
      {/* <CustomDivider icon={<EvoIcon />} text={'EVOLUTION'} /> */}
      {GenerateEvo(evoChain)}
    </div>
  )
}

export default EvolutionGroup;
