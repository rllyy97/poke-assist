import { useCallback, useEffect, useState } from 'react'
import { Avatar, Chip, CssBaseline, Divider, ThemeProvider, Typography } from '@mui/material'

import { HistoryContainer, HistoryTile, SiteWrapper, VariantChip } from './styles'
import { theme } from './Theme'

import { PokemonSpecies } from 'pokenode-ts'

import Header from './components/Header'
import HeroCard from './components/HeroCard'
import StatGroup from './components/DetailGroups/StatGroup'

import { CapitalizeFirstLetter, IdFromPokemonUrl, SpriteUrlFromId } from './utilities/stringManipulation'
import { TYPE_DATA } from './typeData'
import TypeEffGroup from './components/DetailGroups/TypeEffGroup'
import EvolutionGroup from './components/DetailGroups/EvolutionGroup'
import { getSelectedPokemonName, getSelectedTabIndex } from './store/appStatus/appStatusSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPokemon } from './store/appStatus/appStatusSlice'
import MoveGroup from './components/DetailGroups/MoveGroup'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonTabs from './components/PokemonTabs'
import SpeciesSearchBox from './components/SpeciesSearchBox'
import { useApi } from './store/api/apiSelectors'
import { setCurrentPokemon, setCurrentVariant } from './store/pokemonHistory/pokemonHistorySlice'
import { useCurrentPokemon, useCurrentPokemonVariant, usePokemonHistory } from './store/pokemonHistory/pokemonHistorySelectors'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


function App() {
  
  const queryClient = new QueryClient()
  
  const dispatch = useDispatch()
  const api = useApi()
  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// HISTORY
  
  const pokemonHistory = usePokemonHistory()
  const pokemon = useCurrentPokemon();
  const [isLoading, setIsLoading] = useState(false)
  
  const selectPokeByName = useCallback((name: string) => {
    setIsLoading(true)
    dispatch(setCurrentVariant(undefined))
    api.pokemon.getPokemonSpeciesByName(name).then((pokemon) => {
      dispatch(setCurrentPokemon(pokemon))
      setIsLoading(false)
    })
  }, [api.pokemon, dispatch])
  
  const selectedPokemon = useSelector(getSelectedPokemonName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => selectPokeByName(selectedPokemon), [selectedPokemon])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// POKEMON VARIANTS

  // const [pokemonVariant, setPokemonVariant] = useState<Pokemon>()
  const pokemonVariant = useCurrentPokemonVariant()
  useEffect(() => {
    console.log('pokemonVariant changed')
    api.pokemon.getPokemonByName(pokemon?.varieties?.find((p) => p.is_default).pokemon.name)
      .then((pokemon) => dispatch(setCurrentVariant(pokemon)))
  }, [api.pokemon, dispatch, pokemon])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// UI COMPONENTS

  const HistoryPokemon = (props: {pokemonSpecies: PokemonSpecies}) => (
    <HistoryTile onClick={() => dispatch(setSelectedPokemon(props.pokemonSpecies.name))}>
      <img alt={props.pokemonSpecies.name} src={SpriteUrlFromId(props.pokemonSpecies.id)} />
    </HistoryTile>
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// RENDER

  const tabIndex = useSelector(getSelectedTabIndex)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <SiteWrapper>
            <Header />
            <SpeciesSearchBox />

            {pokemon ? (
              <>
                <HeroCard isLoading={isLoading} pokemon={pokemonVariant} speciesName={pokemon.name} />

                {pokemon.varieties?.length > 1 && (
                  <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                    {pokemon.varieties.map((v) => {
                      const selected = v.pokemon?.name === pokemonVariant?.name
                      return (
                        <VariantChip
                          clickable={!selected}
                          key={v.pokemon?.name}
                          avatar={<Avatar alt={v.pokemon.name} src={SpriteUrlFromId(IdFromPokemonUrl(v.pokemon.url))} />}
                          label={CapitalizeFirstLetter(v.pokemon.name.split(`${pokemon.name}-`)[1] ?? 'Default')}
                          // color={selected ? 'primary' : 'default'}
                          onClick={() => api.pokemon.getPokemonByName(v.pokemon.name).then((p) => dispatch(setCurrentVariant(p)))}
                          style={selected ? {backgroundColor: TYPE_DATA[pokemonVariant?.types[0].type.name]?.color} : {}}
                        />
                      )
                    })}
                  </div>
                )}

                <Divider style={{width: '100%'}} />
                
                <PokemonTabs />
                {[
                  <TypeEffGroup pokemon={pokemonVariant} direction={'att'} />,
                  <TypeEffGroup pokemon={pokemonVariant} direction={'def'} />,
                  <StatGroup pokemon={pokemonVariant} />,
                  <EvolutionGroup pokemon={pokemon} />,
                  <MoveGroup pokemon={pokemonVariant} />,
                ].map((c, i) => (
                  <div key={i} style={{display: tabIndex === i ? 'contents' : 'none'}}>{c}</div>
                ))}
                <Divider style={{width: '100%'}} />
              </>
            ) : (
              // Startup hint
              <div style={{margin: '0px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <ArrowDropUpIcon style={{fill: 'rgba(255, 255, 255, 0.16)', transform: 'translate(0px, 10px)'}} />
                <Chip label="Select a Pokemon to get started" />
              </div>
            )}

            <HistoryContainer>
              {pokemonHistory?.slice(1, pokemonHistory.length)?.map((p, i) => <HistoryPokemon pokemonSpecies={p} key={i} />)}
            </HistoryContainer>

          </SiteWrapper>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
