import { useEffect, useState } from 'react'
import { Autocomplete, CssBaseline, Divider, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'

import './App.css'
import { AutocompleteImg, HistoryContainer, HistoryTile, SiteWrapper } from './styles'
import { theme } from './Theme'

import { Pokemon, MainClient } from 'pokenode-ts'
import LazyLoad from 'react-lazy-load';

import Header from './components/Header'
import HeroCard from './components/HeroCard'
import StatGroup from './components/StatGroup'
import TypeEffGroup from './components/TypeEffGroup'

import EffIcon from './icons/typeEffIcon.svg'
import StatsIcon from './icons/stats.svg'
import { SvgIcon } from './GlobalComponents'
import SmogonGroup from './components/SmogonGroup'

import FightIcon from '@mui/icons-material/SportsMma'
import { CapitalizeFirstLetter } from './utilities/stringManipulation'

const IGNORED_NAMES = ['-mega', '-gmax', '-alola', '-galar','-hisui']

function App() {

  const [api] = useState(new MainClient())
  const [apiStatus, setApiStatus] = useState<'loading' | 'connected' | 'disconnected'>('loading')
  const [allNames, setAllNames] = useState<{name: string, id: string}[]>([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
      .then((r) => r.json())
      .then((data) => {
        setApiStatus('connected')
        setAllNames(data.results
          .map((p) => ({ name: p.name, id: p.url.split('https://pokeapi.co/api/v2/pokemon/')[1].split('/')[0] }))
          // .filter(p => !IGNORED_NAMES.some(el => p.name.indexOf(el) !== -1))
        )
      })
      .catch((e) => {
        console.error(e)
        setApiStatus('disconnected')
      })
  }, [])

  const selectPokeByName = (name: string) => {
    api.pokemon.getPokemonByName(name).then((pokemon) => storePoke(pokemon))
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// HISTORY

  const [pokeHistory, setPokeHistory] = useState<Pokemon[]>([])
  const storePoke = (pokemon: Pokemon) => {
    const newHistory = pokeHistory?.filter(p => p.name !== pokemon.name)
    newHistory.unshift(pokemon)
    if (newHistory.length > 9) newHistory.pop()
    setPokeHistory(newHistory)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// UI COMPONENTS

  const HistoryPokemon = (props) => (
    <HistoryTile onClick={() => selectPokeByName(props.pokemon.name)}>
      <img alt={props.pokemon.name} src={props.pokemon.sprites.front_default} />
    </HistoryTile>
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// RENDER

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_e: any, i: number) => setTabIndex(i)

  const pokemon = pokeHistory?.[0]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SiteWrapper>
          <Header />
          <Autocomplete
            disabled={apiStatus !== 'connected'}
            options={allNames}
            value={{name: pokeHistory?.[0]?.name ?? null, id: pokeHistory?.[0]?.id}}
            onChange={(e: any, newValue: any) => selectPokeByName(newValue?.name)}
            getOptionLabel={(option) => CapitalizeFirstLetter(option?.name)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pokemon Name"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: pokeHistory?.[0]?.id && (
                    <AutocompleteImg
                    alt={''}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeHistory?.[0]?.id}.png`}
                    />
                  )
                }}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} style={{textTransform: 'capitalize'}}>
                <AutocompleteImg
                  alt={''}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${option?.id}.png`}
                  style={{marginLeft: '-4px', marginRight: '8px'}}
                />
                {option?.name}
              </li>
            )}
          />

          {pokemon && (
            <>
              <HeroCard api={api} pokemon={pokeHistory?.[0]} />

              <Divider style={{width: '100%'}} />
              <Tabs value={tabIndex} onChange={handleTabChange} style={{marginTop: '-12px'}}>
                <Tab icon={<SvgIcon src={EffIcon} />} aria-label="types-effectiveness" />
                <Tab icon={<SvgIcon src={StatsIcon} />} aria-label="stats" />
                <Tab icon={<FightIcon style={{fill: 'white'}} />} aria-label="smogon-data" />
              </Tabs>
              
              <div style={{display: tabIndex === 0 ? 'contents' : 'none'}}>
                <TypeEffGroup api={api} pokemon={pokemon} />
              </div>
              <div style={{display: tabIndex === 1 ? 'contents' : 'none'}}>
                <StatGroup pokemon={pokemon} />
              </div>
              <div style={{display: tabIndex === 2 ? 'contents' : 'none'}}>
                <SmogonGroup api={api} pokemon={pokemon} />
              </div>
              <Divider style={{width: '100%'}} />
            </>
          )}

          <HistoryContainer>
            {pokeHistory?.slice(1, pokeHistory.length)?.map((p, i) => <HistoryPokemon pokemon={p} key={i} />)}
          </HistoryContainer>

        </SiteWrapper>
      </div>
    </ThemeProvider>
  )
}

export default App
