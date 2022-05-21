

export const FormatStatString = (stat: string): string => {
  const alpha = stat.replace(/[ -.]/g, '')
  console.log(alpha)

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