import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material"
import { setSelectedMove, setSelectedPokemon } from "../../store/appStatus/appStatusSlice"
import PokeTile from "../PokeTile"
import { useDispatch } from "react-redux"
import { useApi } from "../../store/api/apiSelectors"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const LearnedByAccordion = ({pokemon}) => {

  const dispatch = useDispatch()
  const api = useApi()

  return (
    <Accordion style={{ boxShadow: 'none' }}>
      <AccordionSummary id="learned-by-accordion" expandIcon={<ExpandMoreIcon />}>
        <Typography>Learned by</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={"flex row left"} style={{ gap: '0px' }}>
          {pokemon?.map((p, i) => (
            <PokeTile
              key={i}
              name={p.name} 
              url={p.url}
              onClick={async () => {
                dispatch(setSelectedMove(undefined))
                // get species from pokemon
                const variant = await api.pokemon.getPokemonByName(p.name)
                const species = await api.pokemon.getPokemonSpeciesByName(variant.species.name)
                
                dispatch(setSelectedPokemon(species.id))
              }}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default LearnedByAccordion
