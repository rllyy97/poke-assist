

export const FormatStatString = (stat: string): string => {
  const alpha = stat.replace(/[ -.]/g, '')

  const statDict = {
    "hp": "HP",
    "attack": "Atk",
    "defense": "Def",
    "specialattack": "SpA",
    "specialdefense": "SpD",
    "speed": "Spe",
  }

  return statDict[alpha]
}

export const CapitalizeFirstLetter = (s: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : ''

export const IdFromSpeciesUrl = (url: string): string =>
  url.split('https://pokeapi.co/api/v2/pokemon-species/')[1].split('/')[0]

export const IdFromPokemonUrl = (url: string): string =>
  url.split('https://pokeapi.co/api/v2/pokemon/')[1].split('/')[0]

export const SpriteUrlFromId = (id?: string | number): string =>
  id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : ''