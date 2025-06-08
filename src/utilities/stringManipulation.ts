
export const statDict = {
  "hp": "HP",
  "attack": "Atk",
  "defense": "Def",
  "specialattack": "SpA",
  "specialdefense": "SpD",
  "speed": "Spe",
}

export const FormatString = (s?: string): string => 
  CapitalizeFirstLetter(s?.replace(/[ -.]/g, ' '))
  
export const FormatStatString = (stat: string): string => 
  statDict[stat.replace(/[ -.]/g, '')]

export const CapitalizeFirstLetter = (s?: string) =>
  s ? s.charAt(0).toUpperCase() + s.slice(1) : ''
  
export const IdFromUrl = (url?: string) => {
  if (!url) return ''
  const x = url.split('/')
  return x[x.length - 2]
}

export const IdFromSpeciesUrl = (url: string): number =>
  url ? parseInt(url.split('https://pokeapi.co/api/v2/pokemon-species/')[1].split('/')[0]) : 0

export const IdFromPokemonUrl = (url: string): number =>
  url ? parseInt(url.split('https://pokeapi.co/api/v2/pokemon/')[1].split('/')[0]) : 0

export const SpriteUrlFromId = (id?: string | number): string =>
  id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : ''

export const PokeSpriteFromUrl = (url?: string) => 
  url ? SpriteUrlFromId(IdFromUrl(url)) : ''

export const ItemSpriteFromName = (name?: string): string =>
  name ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png` : ''
