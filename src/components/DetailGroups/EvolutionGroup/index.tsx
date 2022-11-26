import { ChainLink, EvolutionDetail, PokemonSpecies } from "pokenode-ts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApi } from "../../../store/api/apiSelectors";
import { setSelectedPokemon } from "../../../store/appStatus/appStatusSlice";
import { IdFromSpeciesUrl, IdFromUrl, SpriteUrlFromId } from "../../../utilities/stringManipulation";
import EvoDetail from "./EvoDetail";

import EvoIcon from '@mui/icons-material/SwipeUpAlt';
import { EvoSprite, Flex } from "./styles";
import { CustomDivider } from "../../../GlobalComponents";


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
    return (
      <Flex dir='row' key={evo.species.name}>
        <Flex dir='column'>
          {(evo as any).evolution_details.map((d: EvolutionDetail) => <EvoDetail detail={d} key={evo.species.name} />)}
        </Flex>
        <Flex dir='column'>
          <EvoSprite
            src={imgUrl}
            alt={name}
            onClick={() => dispatch(setSelectedPokemon(name))}
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
