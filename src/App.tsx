import { useEffect, useState } from 'react'
import { Autocomplete, Button, Chip, CssBaseline, Divider, TextField, ThemeProvider, Tooltip } from '@mui/material'

import './App.css'
import { HistoryContainer, HistoryTile, PokeImg, SiteWrapper, StatBar } from './styles'
import { theme } from './Theme'

import { TypeData } from './typeData'

import { Pokemon, MainClient, Type, Ability, Types } from 'pokenode-ts'

import statBarBackground from './images/stat_bars.png'
import Header from './components/Header'
import HeroCard from './components/HeroCard'
import TypeChip from './components/TypeChip'

function App() {

  const [api, setApi] = useState(new MainClient())
  const [allNames, setAllNames] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0`)
      .then((r) => r.json())
      .then((data) => setAllNames(data.results.map(p => p.name)))
  }, [])

  const selectPokeByName = (name: string) => {
    api.pokemon.getPokemonByName(name).then((pokemon) => storePoke(pokemon))
  }

  // useEffect(() => console.log("STATS", pokeStats), [pokeStats])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// HISTORY

  const [pokeHistory, setPokeHistory] = useState<Pokemon[]>([])
  const storePoke = (pokemon: Pokemon) => {
    const newHistory = pokeHistory?.filter(p => p.name !== pokemon.name)
    newHistory.unshift(pokemon)
    if (newHistory.length > 6) newHistory.pop()
    setPokeHistory(newHistory)
    setType1(undefined)
    setType2(undefined)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// TYPES

  const [type1, setType1] = useState<Type>()
  const [type2, setType2] = useState<Type>()

  useEffect(() => {
    const pokemon = pokeHistory?.[0]
    if (pokemon) {
      api.pokemon.getTypeByName(pokemon?.types?.[0].type.name).then((type) => setType1(type))
      if (pokemon?.types?.length > 1)
        api.pokemon.getTypeByName(pokemon?.types?.[1].type.name).then((type) => setType2(type))
      else 
        setType2(undefined)
    } else {
      setType1(undefined)
      setType2(undefined)
    }
  }, [pokeHistory])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// EFFECTIVENESS

  const [eff4, setEff4] = useState<string[]>([])
  const [eff2, setEff2] = useState<string[]>([])
  const [eff1, setEff1] = useState<string[]>([])
  const [effHalf, setEffHalf] = useState<string[]>([])
  const [effQuarter, setEffQuarter] = useState<string[]>([])
  const [eff0, setEff0] = useState<string[]>([])

  useEffect(() => {

    // STRONG
    const t1strong = type1?.damage_relations?.double_damage_from?.map(t => t.name) ?? []
    const t2strong = type2?.damage_relations?.double_damage_from?.map(t => t.name) ?? []
    // WEAK
    const t1weak = type1?.damage_relations?.half_damage_from?.map(t => t.name) ?? []
    const t2weak = type2?.damage_relations?.half_damage_from?.map(t => t.name) ?? []
    // IMMUNE
    const t1immune = type1?.damage_relations?.no_damage_from?.map(t => t.name) ?? []
    const t2immune = type2?.damage_relations?.no_damage_from?.map(t => t.name) ?? []

    if (!type2) {
      setEff4([])
      setEff2(t1strong)
      setEff1([])
      setEffHalf(t1weak)
      setEffQuarter([])
      setEff0(t1immune)
    } else {

      const temp4 = t1strong.filter((t) => t2strong.includes(t))
      const temp2 = []
      const temp1 = []
      const tempHalf = []
      const tempQuarter = t1weak.filter((t) => t2weak.includes(t))
      const temp0 = [...t1immune, ...t2immune]

      const f0 = (arr: string[]) => arr.filter((t) => !temp0.includes(t))
      
      t1strong.forEach(t => t2weak.includes(t) ? temp1.push(t) : temp2.push(t))
      t2strong.forEach(t => t1weak.includes(t) ? temp1.push(t) : temp2.push(t))
      t1weak.forEach(t => t2strong.includes(t) ? temp1.push(t) : tempHalf.push(t))
      t2weak.forEach(t => t1strong.includes(t) ? temp1.push(t) : tempHalf.push(t))

      setEff4(f0(temp4))
      setEff2(f0(temp2.filter((t) => !temp4.includes(t))))
      setEff1(f0([...new Set(temp1)]))
      setEffHalf(f0(tempHalf.filter((t) => !tempQuarter.includes(t))))
      setEffQuarter(f0(tempQuarter))
      setEff0([...t1immune, ...t2immune])
    }
  }, [type1, type2])

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// UI COMPONENTS

  const TypeRow = (props) => (
    <>
      {props.types.length > 0 &&
        <div className="flex" style={{margin: '4px'}}>
          <h3>{props.num} ×</h3>
          {props.types.map((t) => <TypeChip type={t} />)}
        </div>
      }
    </>
  )

  const StatRow = (props) => (
    <div className="flex row" style={{gap: '12px', transition: '0.2s'}}>
      <h4 style={{width: '80px', textAlign: 'right'}}>{props.name.replace('special-attack', 'sp. atk').replace('special-defense', 'sp. def')}</h4>
      <h6 style={{width: '24px', height: '24px', lineHeight: '24px'}}>{props.value}</h6>
      <div style={{width: '260px', position: 'relative'}}>
        <img src={statBarBackground} alt='' style={{position: 'absolute', left: '0', zIndex: -1}} />
        <StatBar style={{width: `${props.value}px`, backgroundColor: TypeData?.[type1?.name]?.color, color: 'white'}} />
      </div>
    </div>
  )

  const HistoryPokemon = (props) => (
    <HistoryTile onClick={() => selectPokeByName(props.pokemon.name)}>
      <img alt={props.pokemon.name} src={props.pokemon.sprites.front_default} />
    </HistoryTile>
  )

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /// RENDER

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SiteWrapper>
          <Header />
          <HistoryContainer>
            {pokeHistory?.slice(1, pokeHistory.length)?.map((p, i) => <HistoryPokemon pokemon={p} key={i} />)}
          </HistoryContainer>
          <Autocomplete
            options={allNames}
            value={pokeHistory?.[0]?.name ?? null}
            onChange={(e: any, newValue: string | null) => selectPokeByName(newValue)}
            renderInput={(params) => <TextField {...params} label="Pokemon Name" />}
          />
          {pokeHistory?.[0] && (
            <>
              {/* <h2 style={{textTransform: 'capitalize', margin: '16px'}}>
                {pokeHistory?.[0].name}
              </h2> */}
              {/* <div className="flex" style={{textTransform: 'capitalize'}}>
                {type1 && <TypeChip type={type1.name} /> }
                {type2 && <TypeChip type={type2.name} /> }
              </div> */}
              <HeroCard api={api} pokemon={pokeHistory?.[0]} />
              {/* <PokeImg src={pokeHistory?.[0].sprites.other['official-artwork'].front_default} /> */}

              <Divider />

              {/* TYPES */}
              <TypeRow num='4' types={eff4} />
              <TypeRow num='2' types={eff2} />
              {/* <TypeRow num='1' types={eff1} /> */}
              <TypeRow num='½' types={effHalf} />
              <TypeRow num='¼' types={effQuarter} />
              <TypeRow num='0' types={eff0} />
              <Divider />

              {/* STATS */}
              <div className="flex column" style={{gap: '2px'}}>
                {pokeHistory?.[0]?.stats.map((stat) => <StatRow name={stat.stat.name} value={stat.base_stat} />)}
              </div>
              <Divider />
            </>
          )}
        </SiteWrapper>
      </div>
    </ThemeProvider>
  )
}

export default App
