import { useCallback, useEffect, useRef, useState } from 'react'
import { Avatar, Button, Chip, CssBaseline, Divider, IconButton, ThemeProvider } from '@mui/material'
import { SiteWrapper, VariantChip } from './styles'
import { theme } from './Theme'

import { PokemonSpecies } from 'pokenode-ts'

import Header from './components/Header'
import HeroCard from './components/HeroCard'

import { CapitalizeFirstLetter, IdFromPokemonUrl, SpriteUrlFromId } from './utilities/stringManipulation'
import { TYPE_DATA } from './typeData'
import TypeEffGroup from './components/DetailGroups/TypeEffGroup'
import { useDispatch, useSelector } from 'react-redux'
import MoveGroup from './components/DetailGroups/MoveGroup'
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query'
import PokemonTabs from './components/PokemonTabs'
import SpeciesSearchBox from './components/SpeciesSearchBox'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DexGroup from './components/DetailGroups/DexGroup'

import { useSelectedPokemonId, useSelectedTabIndex, useSelectedVariantId } from './store/appStatus/appStatusSelectors'
import PokeHistory from './components/PokeHistory'
import PokeGrid from './components/PokeGrid'
import { useCurrentPokemonSpecies, useCurrentPokemonVariant } from './hooks/query'
import { setSelectedPokemon, setSelectedVariant } from './store/appStatus/appStatusSlice'
import { apiClient } from './store/api/apiSlice'


const queryClient = new QueryClient()

function App() {

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
  const selectedId = useSelectedPokemonId()
  const selectedVariantId = useSelectedVariantId()
  const [showGrid, setShowGrid] = useState(false)
  const isPopstate = useRef(false)

  // Parse hash route on mount and on popstate (back/forward)
  const applyHash = useCallback((fromPopstate = false) => {
    const hash = window.location.hash
    if (fromPopstate) isPopstate.current = true

    if (hash === '#/browse') {
      dispatch(setSelectedPokemon(0))
      dispatch(setSelectedVariant(undefined))
      setShowGrid(true)
    } else if (hash.startsWith('#/pokemon/')) {
      const parts = hash.replace('#/pokemon/', '').split('/')
      const speciesId = parseInt(parts[0])
      const variantId = parts[1] ? parseInt(parts[1]) : undefined
      if (speciesId > 0) {
        dispatch(setSelectedPokemon(speciesId))
        dispatch(setSelectedVariant(variantId))
      }
      setShowGrid(false)
    } else {
      // Home
      dispatch(setSelectedPokemon(0))
      dispatch(setSelectedVariant(undefined))
      setShowGrid(false)
    }
  }, [dispatch])

  useEffect(() => {
    applyHash()
    const handler = () => applyHash(true)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [applyHash])

  // Sync hash when state changes (skip if triggered by back/forward)
  const lastPushedHash = useRef(window.location.hash)

  useEffect(() => {
    if (isPopstate.current) {
      isPopstate.current = false
      lastPushedHash.current = window.location.hash
      return
    }

    let newHash = ''
    if (showGrid && !selectedId) {
      newHash = '#/browse'
    } else if (selectedId > 0) {
      newHash = selectedVariantId && selectedVariantId !== selectedId
        ? `#/pokemon/${selectedId}/${selectedVariantId}`
        : `#/pokemon/${selectedId}`
    } else {
      newHash = '#/'
    }

    if (window.location.hash === newHash) return

    // If only the variant changed (species stayed same), replace instead of push
    const lastSpecies = lastPushedHash.current.match(/#\/pokemon\/(\d+)/)?.[1]
    const newSpecies = newHash.match(/#\/pokemon\/(\d+)/)?.[1]
    if (lastSpecies && newSpecies && lastSpecies === newSpecies) {
      window.history.replaceState(null, '', newHash)
    } else {
      window.history.pushState(null, '', newHash)
    }
    lastPushedHash.current = newHash
  }, [selectedId, selectedVariantId, showGrid])

  useEffect(() => {
    if (selectedId > 0) setShowGrid(false)
    if (selectedId === -1) {
      setShowGrid(true)
      dispatch(setSelectedPokemon(0))
    }
  }, [selectedId, dispatch])

	const {
		isFetching,
		data: species,
	} = useCurrentPokemonSpecies()

	useEffect(() => {
		if (!species) return
		// If the current variant already belongs to this species, don't override it
		const varietyIds = species.varieties?.map(v => IdFromPokemonUrl(v.pokemon.url)) ?? []
		if (selectedVariantId && varietyIds.includes(selectedVariantId)) return
		dispatch(setSelectedVariant(IdFromPokemonUrl(species.varieties?.find((p) => p.is_default).pokemon.url)))
	}, [species, selectedVariantId, dispatch])

	// Prefetch all variants when species loads
	const qc = useQueryClient()
	useEffect(() => {
		if (!species?.varieties) return
		species.varieties.forEach(v => {
			const variantId = IdFromPokemonUrl(v.pokemon.url)
			qc.prefetchQuery(["pokemonVariant", variantId], () => apiClient.pokemon.getPokemonById(variantId))
		})
	}, [species, qc])

  const { data: pokemon, isFetching: isFetchingVariant } = useCurrentPokemonVariant()

  // Don't show stale data from previous Pokemon during transitions
  const isStale = isFetching || (species && pokemon && pokemon.species?.url && !pokemon.species.url.includes(`/${selectedId}/`))
  const activePokemon = isStale ? undefined : pokemon
  const activeSpecies = isFetching ? undefined : species

  /////////////////////////////////////////////////////////////////////////////
  /// RENDER

  const tabIndex = useSelectedTabIndex()

  return (
    <div className="App">
      <SiteWrapper>
        <Header />
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          <IconButton
            disabled={!selectedId || selectedId <= 1}
            onClick={() => dispatch(setSelectedPokemon(selectedId - 1))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <div style={{flex: 1}}>
            <SpeciesSearchBox />
          </div>
          <IconButton
            disabled={!selectedId}
            onClick={() => dispatch(setSelectedPokemon(selectedId + 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>

        {(activeSpecies || selectedId > 0) && (
          <>
            <HeroCard isLoading={!activePokemon} pokemon={activePokemon} speciesName={activeSpecies?.name} />

            {activeSpecies?.varieties?.length > 1 && (
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                {activeSpecies.varieties.map((v) => {
                  const selected = v.pokemon?.name === activePokemon?.name
                  return (
                    <VariantChip
                      key={v.pokemon?.name}
                      avatar={<Avatar alt={v.pokemon.name} src={SpriteUrlFromId(IdFromPokemonUrl(v.pokemon.url))} />}
                      label={CapitalizeFirstLetter(v.pokemon.name.split(`${activeSpecies.name}-`)[1] ?? 'Default')}
                      clickable={!selected}
                      onClick={() => dispatch(setSelectedVariant(IdFromPokemonUrl(v.pokemon.url)))}
                      style={selected ? {backgroundColor: TYPE_DATA[activePokemon?.types[0].type.name]?.color} : {}}
                    />
                  )
                })}
              </div>
            )}
            
            {activeSpecies && <>
              <PokemonTabs />
              {[
                <TypeEffGroup pokemon={activePokemon} />,
                <DexGroup pokemon={activePokemon} species={activeSpecies} />,
                <MoveGroup pokemon={activePokemon} />,
              ].map((c, i) => (
                <div key={i} style={{display: tabIndex === i ? 'contents' : 'none'}}>{c}</div>
              ))}
            </>}
          </>
        )}

        {!selectedId && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {!showGrid && (
              <>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <ArrowDropUpIcon style={{fill: 'rgba(255, 255, 255, 0.16)', transform: 'translate(0px, 10px)'}} />
                  <Chip label="Select a Pokemon to get started" />
                </div>
                <Divider sx={{ width: '100%', my: 2, fontSize: '0.75rem', opacity: 0.5 }}>OR</Divider>
                <Button variant="outlined" onClick={() => setShowGrid(true)}>Browse</Button>
              </>
            )}
            {showGrid && <PokeGrid />}
          </div>
        )}

        <PokeHistory />

      </SiteWrapper>
    </div>
  )
}

export default App
