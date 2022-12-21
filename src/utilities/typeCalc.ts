import { Type } from "pokenode-ts"
import { TYPE_DATA } from "../typeData"


export interface EffGroupData {
  strong: string[]
  weak: string[]
  immune: string[]
  normal: string[]
}

export const getEffAtt = (type?: Type): EffGroupData => {
  const strong = type?.damage_relations?.double_damage_to?.map(t => t.name) ?? []
  const weak = type?.damage_relations?.half_damage_to?.map(t => t.name) ?? []
  const immune = type?.damage_relations?.no_damage_to?.map(t => t.name) ?? []
  const normal = Object.keys(TYPE_DATA).filter(t => !strong.includes(t) && !weak.includes(t) && !immune.includes(t))
  return { strong, weak, immune, normal }
}

export const getEffDef = (type?: Type): EffGroupData => {
  const strong = type?.damage_relations?.double_damage_from?.map(t => t.name) ?? []
  const weak = type?.damage_relations?.half_damage_from?.map(t => t.name) ?? []
  const immune = type?.damage_relations?.no_damage_from?.map(t => t.name) ?? []
  const normal = Object.keys(TYPE_DATA).filter(t => !strong.includes(t) && !weak.includes(t) && !immune.includes(t))
  return { strong, weak, immune, normal }
}

export const getDoubleEffDef = (type1: Type, type2: Type): Record<string, number> => {
  const { strong: s1, weak: w1, immune: i1 } = getEffDef(type1)
  const { strong: s2, weak: w2, immune: i2 } = getEffDef(type2)
  
  const typeObj = {}
  Object.keys(TYPE_DATA).forEach(type => typeObj[type] = 1)

  s1.forEach(t => typeObj[t] *= 2)
  w1.forEach(t => typeObj[t] *= 0.5)
  i1.forEach(t => typeObj[t] = 0)
  s2.forEach(t => typeObj[t] *= 2)
  w2.forEach(t => typeObj[t] *= 0.5)
  i2.forEach(t => typeObj[t] = 0)

  return typeObj
}
