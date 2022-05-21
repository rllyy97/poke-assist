import { Gen7ou } from "../data/sets/gen7ou";
import { Gen8ou } from "../data/sets/gen8ou"
import { SmogonSet } from "../data/sets/interfaces";

export const FetchSmogonData = (name: string, gen: 7 | 8): SmogonSet[] => {
  const sets: SmogonSet[] = []

  const data = gen === 7 ? Gen7ou : gen === 8 ? Gen8ou : []
  const poke = data[name.toLowerCase()]
  if (poke) Object.keys(poke)?.forEach((key: string) => {
    let set = {...Gen8ou[name][key], setName: key}
    if (typeof set.ability === "string") set.ability = [set.ability]
    if (typeof set.item === "string") set.item = [set.item]
    if (typeof set.nature === "string") set.nature = [set.nature]

    set.moves?.forEach((move, i) => {
      if (typeof move === "string") set.moves[i] = [move]
    })

    sets.push(set as SmogonSet)
  })
  return sets;
}