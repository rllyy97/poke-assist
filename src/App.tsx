import { Button, Chip, CssBaseline, Divider, TextField, ThemeProvider, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import './App.css'
import { PokeImg, SiteWrapper } from './styles'
import { theme } from './Theme'

import { capitalize } from '@mui/material'


function App() {

  const [pokeName, setPokeName] = useState('')
  const [pokeStats, setPokeStats] = useState<any>(undefined)

  const requestPokeStats = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`)
      .then((r) => r.json())
      .then((r) => setPokeStats(r), (e) => setPokeStats(undefined))
  }

  useEffect(() => console.log("STATS", pokeStats), [pokeStats])

  const [type1, setType1] = useState<any>()
  const [type2, setType2] = useState<any>()

  useEffect(() => {
    if (pokeStats) {
      const t1 = pokeStats.types[0]
      const t2 = pokeStats.types[1]
      if (t1)
        fetch(t1.type.url).then(r => r.json()).then(r => setType1(r))
      else 
        setType1(undefined)
      if (t2)
        fetch(t2.type.url).then(r => r.json()).then(r => setType2(r))
      else
        setType2(undefined)
    } else {
      setType1(undefined)
      setType2(undefined)
    }
  }, [pokeStats])

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

  const TypeRow = (props) => (
    <>
      {props.types.length > 0 &&
        <div className="flex" style={{textTransform: 'capitalize'}}>
          <h3>{props.num} ×</h3>
          {props.types.map((t) => <Chip label={t} />)}
        </div>
      }
    </>
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SiteWrapper>
          <h1>PokeAssist</h1>
          <TextField
            label="Pokemon Name"
            value={pokeName}
            onChange={(e) => setPokeName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && requestPokeStats()}
          />
          <Button variant="outlined" onClick={requestPokeStats}>
            Search Pokemon
          </Button>
          {pokeStats && (
            <>
              <Divider />
              <h2 style={{textTransform: 'capitalize'}}>
                {pokeStats.name}
              </h2>
              <div className="flex" style={{textTransform: 'capitalize'}}>
                {type1 && <Chip label={type1.name} /> }
                {type2 && <Chip label={type2.name} /> }
              </div>
              <PokeImg src={pokeStats.sprites.other['official-artwork'].front_default} />
              <div className="flex">
                {pokeStats?.abilities?.map(a => (
                  <Tooltip title='temp'>
                    <Chip style={{textTransform: 'capitalize'}} label={a.ability.name} />
                  </Tooltip>
                ))}
              </div>
              <Divider />

              <TypeRow num='4' types={eff4} />
              <TypeRow num='2' types={eff2} />
              <TypeRow num='1' types={eff1} />
              <TypeRow num='1/2' types={effHalf} />
              <TypeRow num='1/4' types={effQuarter} />
              <TypeRow num='0' types={eff0} />

              <Divider />
            </>
          )}
        </SiteWrapper>
      </div>
    </ThemeProvider>
  )
}

export default App
