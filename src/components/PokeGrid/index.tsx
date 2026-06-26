import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSelectedPokemon, setSelectedVariant } from "../../store/appStatus/appStatusSlice"
import { SpriteUrlFromId } from "../../utilities/stringManipulation"
import { Chip, Divider, IconButton } from "@mui/material"
import { TYPE_DATA } from "../../typeData"
import TypeDot from "../TypeDot"
import GridViewIcon from '@mui/icons-material/GridView'
import AppsIcon from '@mui/icons-material/Apps'

const REGIONS = [
  { name: 'Kanto', start: 1, end: 151 },
  { name: 'Johto', start: 152, end: 251 },
  { name: 'Hoenn', start: 252, end: 386 },
  { name: 'Sinnoh', start: 387, end: 493 },
  { name: 'Unova', start: 494, end: 649 },
  { name: 'Kalos', start: 650, end: 721 },
  { name: 'Alola', start: 722, end: 809 },
  { name: 'Galar', start: 810, end: 905 },
  { name: 'Paldea', start: 906, end: 1025 },
]

const FORM_FILTERS = [
  { label: 'Mega', pattern: ['-mega'] },
  { label: 'Gmax', pattern: ['-gmax'] },
  { label: 'Regional', pattern: ['-alola', '-galar', '-hisui', '-paldea'] },
]

interface FilteredPokemon {
  id: number
  name: string
}

const PokeGrid = () => {
  const dispatch = useDispatch()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedForm, setSelectedForm] = useState<string[] | null>(null)
  const [largeIcons, setLargeIcons] = useState(false)
  const [allPokemonByType, setAllPokemonByType] = useState<FilteredPokemon[] | null>(null)
  const [filteredIds, setFilteredIds] = useState<number[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [typeData, setTypeData] = useState<Record<string, FilteredPokemon[]> | null>(null)

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const toggleForm = (patterns: string[]) => {
    setSelectedForm(prev => prev === patterns ? null : patterns)
  }

  const handlePokemonClick = (id: number) => {
    if (id <= 1025) {
      dispatch(setSelectedPokemon(id))
    } else {
      // Variant: fetch its species, then select species + variant
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(r => r.json())
        .then(data => {
          const speciesUrl: string = data.species.url
          const speciesId = parseInt(speciesUrl.split('/pokemon-species/')[1].split('/')[0])
          dispatch(setSelectedPokemon(speciesId))
          dispatch(setSelectedVariant(id))
        })
    }
  }

  // Preload all type data on mount
  useEffect(() => {
    const allTypes = Object.keys(TYPE_DATA)
    Promise.all(
      allTypes.map(type =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`)
          .then(r => r.json())
          .then(data => ({
            type,
            pokemon: data.pokemon.map((p: any) => ({
              id: parseInt(p.pokemon.url.split('/pokemon/')[1].split('/')[0]),
              name: p.pokemon.name,
            })) as FilteredPokemon[]
          }))
      )
    ).then(results => {
      const map: Record<string, FilteredPokemon[]> = {}
      for (const r of results) {
        map[r.type] = r.pokemon
      }
      setTypeData(map)
    })
  }, [])

  // Filter Pokemon locally based on selected types
  useEffect(() => {
    if (selectedTypes.length === 0 || !typeData) {
      setAllPokemonByType(null)
      setFilteredIds(null)
      return
    }

    if (selectedTypes.length === 1) {
      // Single type: show only mono-type Pokemon
      const selected = selectedTypes[0]
      const selectedSet = new Set(typeData[selected].map(p => p.id))
      const otherIds = new Set<number>()
      for (const [type, pokemon] of Object.entries(typeData)) {
        if (type !== selected) {
          for (const p of pokemon) {
            if (selectedSet.has(p.id)) otherIds.add(p.id)
          }
        }
      }
      const monoType = typeData[selected]
        .filter(p => !otherIds.has(p.id))
        .sort((a, b) => a.id - b.id)
      setAllPokemonByType(monoType)
    } else {
      // Multiple types: intersect
      let intersection = typeData[selectedTypes[0]]
      for (let i = 1; i < selectedTypes.length; i++) {
        const set = new Set(typeData[selectedTypes[i]].map(p => p.id))
        intersection = intersection.filter(p => set.has(p.id))
      }
      intersection.sort((a, b) => a.id - b.id)
      setAllPokemonByType(intersection)
    }
  }, [selectedTypes, typeData])

  // Apply form filter on top of type filter
  useEffect(() => {
    if (!allPokemonByType) {
      if (selectedForm) {
        // Form filter only, no type filter - fetch all Pokemon with that form
        setLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
          .then(r => r.json())
          .then(data => {
            const matching = data.results
              .filter((p: any) => selectedForm.some(pat => p.name.includes(pat)))
              .map((p: any) => parseInt(p.url.split('/pokemon/')[1].split('/')[0]))
              .sort((a: number, b: number) => a - b)
            setFilteredIds(matching)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      } else {
        setFilteredIds(null)
      }
      return
    }

    if (selectedForm) {
      setFilteredIds(allPokemonByType.filter(p => selectedForm.some(pat => p.name.includes(pat))).map(p => p.id))
    } else {
      setFilteredIds(allPokemonByType.map(p => p.id))
    }
  }, [allPokemonByType, selectedForm])

  const isFiltered = filteredIds !== null
  const iconSize = largeIcons ? '96px' : '48px'

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      maxWidth: '1200px',
      width: 'calc(100vw - 32px)',
      alignSelf: 'center',
    }}>
      {/* Type filter bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        justifyContent: 'center',
        padding: '8px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '12px',
      }}>
        {Object.keys(TYPE_DATA).map(type => (
          <div
            key={type}
            onClick={() => toggleType(type)}
            style={{
              cursor: 'pointer',
              opacity: selectedTypes.length === 0 || selectedTypes.includes(type) ? 1 : 0.3,
              transition: 'opacity 0.15s',
            }}
          >
            <TypeDot type={type} variant="square" size="small" />
          </div>
        ))}
      </div>

      {/* Form filter chips + size toggle */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {FORM_FILTERS.map(form => (
          <Chip
            key={form.label}
            label={form.label}
            size="small"
            variant={selectedForm === form.pattern ? 'filled' : 'outlined'}
            color={selectedForm === form.pattern ? 'primary' : 'default'}
            onClick={() => toggleForm(form.pattern)}
            style={{ cursor: 'pointer' }}
          />
        ))}
        <IconButton size="small" onClick={() => setLargeIcons(!largeIcons)} style={{ opacity: 0.6 }}>
          {largeIcons ? <AppsIcon fontSize="small" /> : <GridViewIcon fontSize="small" />}
        </IconButton>
      </div>

      {/* Pokemon grid */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '12px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '12px',
        maxHeight: 'calc(100vh - 360px)',
        overflowY: 'auto',
      }}>
        {loading && (
          <div style={{ textAlign: 'center', opacity: 0.5, padding: '16px' }}>Loading...</div>
        )}
        {!loading && isFiltered && filteredIds.length === 0 && (
          <div style={{ textAlign: 'center', opacity: 0.5, padding: '16px' }}>No Pokemon found</div>
        )}
        {/* Filtered: flat list */}
        {!loading && isFiltered && filteredIds.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(auto-fill, ${iconSize})`,
            gap: '4px',
            justifyContent: 'center',
          }}>
            {filteredIds.map((id) => (
              <img
                key={id}
                alt={`#${id}`}
                src={SpriteUrlFromId(id)}
                loading="lazy"
                style={{
                  width: iconSize,
                  height: iconSize,
                  cursor: 'pointer',
                  borderRadius: '8px',
                  transition: 'background 0.1s',
                  imageRendering: 'pixelated',
                }}
                onClick={() => handlePokemonClick(id)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              />
            ))}
          </div>
        )}
        {/* Unfiltered: grouped by region */}
        {!loading && !isFiltered && REGIONS.map((region) => (
          <div key={region.name}>
            <Divider textAlign="left" sx={{ mb: '8px', fontSize: '0.75rem', opacity: 0.7 }}>
              {region.name}
            </Divider>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, ${iconSize})`,
              gap: '4px',
              justifyContent: 'center',
            }}>
              {Array.from({ length: region.end - region.start + 1 }, (_, i) => region.start + i).map((id) => (
                <img
                  key={id}
                  alt={`#${id}`}
                  src={SpriteUrlFromId(id)}
                  loading="lazy"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background 0.1s',
                    imageRendering: 'pixelated',
                  }}
                  onClick={() => handlePokemonClick(id)}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PokeGrid
