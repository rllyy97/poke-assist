import { useCallback, useEffect, useState } from 'react'
import { Avatar, Chip, CssBaseline, ThemeProvider } from '@mui/material'
import { SiteWrapper, VariantChip } from './styles'
import { theme } from './Theme'

import { PokemonSpecies } from 'pokenode-ts'

import Header from './components/Header'
import HeroCard from './components/HeroCard'

import { CapitalizeFirstLetter, IdFromPokemonUrl, SpriteUrlFromId } from './utilities/stringManipulation'
import { TYPE_DATA } from './typeData'
import TypeEffGroup from './components/DetailGroups/TypeEffGroup'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPokemon } from './store/appStatus/appStatusSlice'
import MoveGroup from './components/DetailGroups/MoveGroup'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonTabs from './components/PokemonTabs'
import SpeciesSearchBox from './components/SpeciesSearchBox'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DexGroup from './components/DetailGroups/DexGroup'

import SearchIcon from '@mui/icons-material/Search';
import { useSelectedPokemonName, useSelectedTabIndex } from './store/appStatus/appStatusSelectors'
import { useCurrentPokemon, useCurrentPokemonVariant } from './store/pokemonHistory/pokemonHistorySelectors'
import { useApi } from './store/api/apiSelectors'
import { setCurrentPokemon, setCurrentVariant } from './store/pokemonHistory/pokemonHistorySlice'
import PokeHistory from './components/PokeHistory'


function App() {
  
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Content />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

const Content = () => {
  
  const dispatch = useDispatch()
  const api = useApi()
  
  /////////////////////////////////////////////////////////////////////////////
  /// HISTORY
  
  const species = useCurrentPokemon();
  const [isLoading, setIsLoading] = useState(false)
  
  const selectPokeByName = useCallback((name: string) => {
    setIsLoading(true)
    dispatch(setCurrentVariant(undefined))
    api.pokemon.getPokemonSpeciesByName(name).then((pokemon) => {
      dispatch(setCurrentPokemon(pokemon))
      setIsLoading(false)
    })
  }, [api.pokemon, dispatch])
  
  const selectedPokemon = useSelectedPokemonName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => selectPokeByName(selectedPokemon), [selectedPokemon])

  /////////////////////////////////////////////////////////////////////////////
  /// POKEMON VARIANTS

  const pokemon = useCurrentPokemonVariant()
  useEffect(() => {
    api.pokemon.getPokemonByName(species?.varieties?.find((p) => p.is_default).pokemon.name)
      .then((pokemon) => dispatch(setCurrentVariant(pokemon)))
  }, [api.pokemon, dispatch, species])

  /////////////////////////////////////////////////////////////////////////////
  /// RENDER

  const tabIndex = useSelectedTabIndex()

  return (
    <div className="App">
      <SiteWrapper>
        <Header />
        <SpeciesSearchBox />

        {species ? (
          <>
            <HeroCard isLoading={isLoading} pokemon={pokemon} speciesName={species.name} />

            {species.varieties?.length > 1 && (
              <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {species.varieties.map((v) => {
                  const selected = v.pokemon?.name === pokemon?.name
                  return (
                    <VariantChip
                      key={v.pokemon?.name}
                      avatar={<Avatar alt={v.pokemon.name} src={SpriteUrlFromId(IdFromPokemonUrl(v.pokemon.url))} />}
                      label={CapitalizeFirstLetter(v.pokemon.name.split(`${species.name}-`)[1] ?? 'Default')}
                      clickable={!selected}
                      onClick={() => api.pokemon.getPokemonByName(v.pokemon.name).then((p) => dispatch(setCurrentVariant(p)))}
                      style={selected ? {backgroundColor: TYPE_DATA[pokemon?.types[0].type.name]?.color} : {}}
                    />
                  )
                })}
              </div>
            )}
            
            <PokemonTabs />
            {[
              <TypeEffGroup pokemon={pokemon} />,
              <DexGroup pokemon={pokemon} species={species} />,
              <MoveGroup pokemon={pokemon} />,
            ].map((c, i) => (
              <div key={i} style={{display: tabIndex === i ? 'contents' : 'none'}}>{c}</div>
            ))}
          </>
        ) : (
          // Startup hint
          <div style={{margin: '0px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <ArrowDropUpIcon style={{fill: 'rgba(255, 255, 255, 0.16)', transform: 'translate(0px, 10px)'}} />
            <Chip label="Select a Pokemon to get started" />
          </div>
        )}

        <PokeHistory />

      </SiteWrapper>
    </div>
  )
}

export default App
