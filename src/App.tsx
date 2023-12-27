import { useCallback, useEffect, useState } from 'react'
import { Avatar, Chip, CssBaseline, ThemeProvider } from '@mui/material'
import { HistoryContainer, HistoryTiles, SiteWrapper, VariantChip } from './styles'
import { theme } from './Theme'

import { PokemonSpecies } from 'pokenode-ts'

import Header from './components/Header'
import HeroCard from './components/HeroCard'

import { CapitalizeFirstLetter, IdFromPokemonUrl, SpriteUrlFromId } from './utilities/stringManipulation'
import { TYPE_DATA } from './typeData'
import TypeEffGroup from './components/DetailGroups/TypeEffGroup'
import { useSelectedPokemon, useSelectedSpecies, useSelectedTabIndex } from './store/appStatus/appStatusSelectors'
import { useDispatch } from 'react-redux'
import { setSelectedVariant } from './store/appStatus/appStatusSlice'
import MoveGroup from './components/DetailGroups/MoveGroup'
import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonTabs from './components/PokemonTabs'
import SpeciesSearchBox from './components/SpeciesSearchBox'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DexGroup from './components/DetailGroups/DexGroup'
import SpeciesHistory from './components/SpeciesHistory'


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
  
  /////////////////////////////////////////////////////////////////////////////
  /// SPECIES
  
  const { data: species, isLoading: speciesLoading } = useSelectedSpecies()
  const { data: pokemon, isLoading: pokemonLoading } = useSelectedPokemon()
  const isLoading = speciesLoading || pokemonLoading

  useEffect(() => {
    if (!species) return
    dispatch(setSelectedVariant(species?.varieties?.find((p) => p.is_default).pokemon.name))
  }, [species])

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
                      onClick={() => dispatch(setSelectedVariant(v.pokemon.name))}
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

        <SpeciesHistory />

      </SiteWrapper>
    </div>
  )
}

export default App
