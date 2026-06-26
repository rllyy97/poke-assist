import { Autocomplete, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useApiStatus } from "../../store/api/apiSelectors"
import { setApiStatus } from "../../store/api/apiSlice"
import { AutocompleteImg } from "../../styles"
import { CapitalizeFirstLetter, IdFromSpeciesUrl, SpriteUrlFromId } from "../../utilities/stringManipulation"
import { setSelectedPokemon } from "../../store/appStatus/appStatusSlice"
import { useSelectedPokemonId } from "../../store/appStatus/appStatusSelectors"


const SpeciesSearchBox = () => {

  const dispatch = useDispatch()
  const apiStatus = useApiStatus()
  const selectedId = useSelectedPokemonId()

  const [allNames, setAllNames] = useState<{name: string, id: number}[]>([])

  const currentValue = useMemo(() => {
    if (!selectedId || allNames.length === 0) return null
    return allNames.find((p) => p.id === selectedId) ?? null
  }, [selectedId, allNames])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species?limit=10000`)
      .then((r) => r.json())
      .then((data) => {
        dispatch(setApiStatus('connected'))
        setAllNames(data.results
          .map((p) => ({name: p.name, id: IdFromSpeciesUrl(p.url)}))
        )
      })
      .catch((e) => {
        console.error(e)
        dispatch(setApiStatus('disconnected'))
      })
  }, [dispatch])

  return (
    <Autocomplete
      id="species-search-box"
      disabled={apiStatus !== 'connected'}
      options={allNames}
      value={currentValue}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_e: any, newValue: any) => {
        if (newValue?.id) {
          dispatch(setSelectedPokemon(newValue?.id));
          (document.activeElement as HTMLElement).blur();
        }
      }}
      getOptionLabel={(option) => CapitalizeFirstLetter(option?.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Pokemon Name"
          InputProps={{
            ...params.InputProps,
            startAdornment: selectedId > 0 && (
              <AutocompleteImg alt={''} src={SpriteUrlFromId(selectedId)} />
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
  )

}

export default SpeciesSearchBox
