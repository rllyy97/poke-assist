
export const TYPE_EFF: Record<string, string> = {
  REGULAR: 'REGULAR',
  STRONG: 'STRONG',
  WEAK: 'WEAK',
  IMMUNE: 'IMMUNE',
}

export type TypeEffectiveness = keyof typeof TYPE_EFF;
