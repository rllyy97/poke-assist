import { useEffect, useState } from 'react'
import { Autocomplete, Avatar, CssBaseline, Divider, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'

import './App.css'
import { AutocompleteImg, HistoryContainer, HistoryTile, SiteWrapper, VariantChip } from './styles'
import { theme } from './Theme'

import { Pokemon, MainClient, PokemonSpecies } from 'pokenode-ts'

import Header from './components/Header'
import HeroCard from './components/HeroCard'
import StatGroup from './components/StatGroup'
import TypeEffGroup from './components/TypeEffGroup'

import EffIcon from './icons/typeEffIcon.svg'
import StatsIcon from './icons/stats.svg'
import { SvgIcon } from './GlobalComponents'
import SmogonGroup from './components/SmogonGroup'

import FightIcon from '@mui/icons-material/SportsMma'
import { CapitalizeFirstLetter, IdFromPokemonUrl, IdFromSpeciesUrl, SpriteUrlFromId } from './utilities/stringManipulation'
import { TYPE_DATA } from './typeData'


function App() {

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

  const selectPokeByName = (name: string) => {
    api.pokemon.getPokemonSpeciesByName(name).then((pokemon) => storePoke(pokemon))
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// HISTORY

  const [pokeHistory, setPokeHistory] = useState<PokemonSpecies[]>([])
  const storePoke = (pokemon: PokemonSpecies) => {
    const newHistory = pokeHistory?.filter(p => p.name !== pokemon.name)
    newHistory.unshift(pokemon)
    if (newHistory.length > 9) newHistory.pop()
    setPokeHistory(newHistory)
  }

  const pokemon = pokeHistory?.[0]

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// POKEMON VARIANTS

  const [pokemonVariant, setPokemonVariant] = useState<Pokemon>()
  useEffect(() => {
    api.pokemon.getPokemonByName(
      pokemon?.varieties.find((p) => p.is_default).pokemon.name)
        .then((pokemon) => setPokemonVariant(pokemon)
    )
  }, [pokeHistory])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// UI COMPONENTS

  const HistoryPokemon = (props: {pokemonSpecies: PokemonSpecies}) => (
    <HistoryTile onClick={() => selectPokeByName(props.pokemonSpecies.name)}>
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
            value={{name: pokemon?.name, id: pokemon?.id}}
            onChange={(e: any, newValue: any) => selectPokeByName(newValue?.name)}
            getOptionLabel={(option) => CapitalizeFirstLetter(option?.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pokemon Name"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: pokemon?.id && (
                    <AutocompleteImg
                    alt={''}
                    src={SpriteUrlFromId(pokemon?.id)}
                    />
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

              {pokemon.varieties.length > 1 && (
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
              <Tabs value={tabIndex} onChange={handleTabChange} style={{marginTop: '-12px'}}>
                <Tab icon={<SvgIcon src={EffIcon} />} aria-label="types-effectiveness" />
                <Tab icon={<SvgIcon src={StatsIcon} />} aria-label="stats" />
                <Tab icon={<FightIcon style={{fill: 'white'}} />} aria-label="smogon-data" />
              </Tabs>
              
              <div style={{display: tabIndex === 0 ? 'contents' : 'none'}}>
                <TypeEffGroup api={api} pokemon={pokemonVariant} />
              </div>
              <div style={{display: tabIndex === 1 ? 'contents' : 'none'}}>
                <StatGroup pokemon={pokemonVariant} />
              </div>
              <div style={{display: tabIndex === 2 ? 'contents' : 'none'}}>
                <SmogonGroup api={api} pokemon={pokemonVariant} />
              </div>
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
