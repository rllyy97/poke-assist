import { useCallback, useEffect, useState } from 'react'
import { Autocomplete, Avatar, CssBaseline, Divider, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'

import { AutocompleteImg, HistoryContainer, HistoryTile, SiteWrapper, VariantChip } from './styles'
import { theme } from './Theme'

import { Pokemon, MainClient, PokemonSpecies } from 'pokenode-ts'

import Header from './components/Header'
import HeroCard from './components/HeroCard'
import StatGroup from './components/DetailGroups/StatGroup'

import SwordIcon from './icons/sword.svg'
import StatsIcon from './icons/stats.svg'
import { SvgIcon } from './GlobalComponents'

import ShieldIcon from '@mui/icons-material/Shield';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { CapitalizeFirstLetter, IdFromPokemonUrl, IdFromSpeciesUrl, SpriteUrlFromId } from './utilities/stringManipulation'
import { TYPE_DATA } from './typeData'
import TypeEffGroup from './components/DetailGroups/TypeEffGroup'
import EvolutionGroup from './components/DetailGroups/EvolutionGroup'
import { getSelectedPokemonName } from './store/appStatus/appStatusSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPokemon } from './store/appStatus/appStatusSlice'


function App() {

  const dispatch = useDispatch()

  const [api] = useState(new MainClient())
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading')
  const [allNames, setAllNames] = useState<{name: string, id: string}[]>([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=10000`)
      .then((r) => r.json())
      .then((data) => {
        setApiStatus('connected')
        setAllNames(data.results
          .map((p) => ({ name: p.name, id: IdFromSpeciesUrl(p.url) }))
        )
      })
      .catch((e) => {
        console.error(e)
        setApiStatus('disconnected')
      })
  }, [])

  
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// HISTORY
  
  const [pokeHistory, setPokeHistory] = useState<PokemonSpecies[]>([])
  
  const selectPokeByName = useCallback((name: string) => {
    setPokemonVariant(undefined)
    api.pokemon.getPokemonSpeciesByName(name).then((pokemon) => {
      const newHistory = pokeHistory?.filter(p => p.name !== pokemon.name)
      newHistory.unshift(pokemon)
      if (newHistory.length > 9) newHistory.pop()
      setPokeHistory(newHistory)
    })
  }, [api.pokemon, pokeHistory])
  
  const pokemon = pokeHistory?.[0]
  const selectedPokemon = useSelector(getSelectedPokemonName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => selectPokeByName(selectedPokemon), [selectedPokemon])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// POKEMON VARIANTS

  const [pokemonVariant, setPokemonVariant] = useState<Pokemon>()
  useEffect(() => {
    api.pokemon.getPokemonByName(
      pokemon?.varieties?.find((p) => p.is_default).pokemon.name)
        .then((pokemon) => setPokemonVariant(pokemon)
    )
  }, [api.pokemon, pokeHistory, pokemon?.varieties])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// UI COMPONENTS

  const HistoryPokemon = (props: {pokemonSpecies: PokemonSpecies}) => (
    <HistoryTile onClick={() => dispatch(setSelectedPokemon(props.pokemonSpecies.name))}>
      <img alt={props.pokemonSpecies.name} src={SpriteUrlFromId(props.pokemonSpecies.id)} />
    </HistoryTile>
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// RENDER

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_e: any, i: number) => setTabIndex(i)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SiteWrapper>
          <Header />
          <Autocomplete
            disabled={apiStatus !== 'connected'}
            options={allNames}
            // value={{name: pokemon?.name, id: pokemon?.id}}
            onChange={(e: any, newValue: any) => {
              if (newValue?.name) dispatch(setSelectedPokemon(newValue?.name))
            }}
            getOptionLabel={(option) => CapitalizeFirstLetter(option?.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pokemon Name"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: pokemon?.id && (
                    <AutocompleteImg alt={''} src={SpriteUrlFromId(pokemon?.id)} />
                  )
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{textTransform: 'capitalize'}}>
                <AutocompleteImg
                  alt={''}
                  src={SpriteUrlFromId(option?.id)}
                  style={{marginLeft: '-4px', marginRight: '8px'}}
                />
                {option?.name}
              </li>
            )}
          />

          {pokemon && (
            <>
              <HeroCard api={api} pokemon={pokemonVariant} speciesName={pokemon.name} />

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
                        onClick={() => api.pokemon.getPokemonByName(v.pokemon.name).then((p) => setPokemonVariant(p))}
                        style={selected ? {backgroundColor: TYPE_DATA[pokemonVariant?.types[0].type.name]?.color} : {}}
                      />
                    )
                  })}
                </div>
              )}

              <Divider style={{width: '100%'}} />
              <Tabs value={tabIndex} onChange={handleTabChange} style={{marginTop: '-16px'}}>
                <Tab icon={<SvgIcon src={SwordIcon} />} />
                <Tab icon={<ShieldIcon style={{fill: 'white'}} />} aria-label="types-def-effectiveness" />
                <Tab icon={<SvgIcon src={StatsIcon} />} />
                <Tab icon={<ArrowCircleUpIcon style={{fill: 'white'}} />} />
                {/* <Tab icon={<FightIcon style={{fill: 'white'}} />} /> */}
              </Tabs>

              {[
                <TypeEffGroup api={api} pokemon={pokemonVariant} direction={'att'} />,
                <TypeEffGroup api={api} pokemon={pokemonVariant} direction={'def'} />,
                <StatGroup pokemon={pokemonVariant} />,
                <EvolutionGroup api={api} pokemon={pokemon} />,
                // <SmogonGroup api={api} pokemon={pokemonVariant} />,
              ].map((c, i) => (
                <div key={i} style={{display: tabIndex === i ? 'contents' : 'none'}}>{c}</div>
              ))}
              <Divider style={{width: '100%'}} />
            </>
          )}

          <HistoryContainer>
            {pokeHistory?.slice(1, pokeHistory.length)?.map((p, i) => <HistoryPokemon pokemonSpecies={p} key={i} />)}
          </HistoryContainer>

        </SiteWrapper>
      </div>
    </ThemeProvider>
  )
}

export default App
