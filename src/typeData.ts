
interface TypeData {
    name: string;
    color: string;
    icon: string;
    order: number;
} 

export const TYPE_DATA: Record<string, TypeData> = {
  normal: {
    name: 'Normal',
    color: '#A0A29F',
    icon: 'src/icons/types/normal.svg',
    order: 0,
  },
  fire: {
    name: 'Fire',
    color: '#FBA64C',
    icon: 'src/icons/types/fire.svg',
    order: 1,
  },
  water: {
    name: 'Water',
    color: '#539DDF',
    icon: 'src/icons/types/water.svg',
    order: 2,
  },
  grass: {
    name: 'Grass',
    color: '#60BD58',
    icon: 'src/icons/types/grass.svg',
    order: 3,
  },
  electric: {
    name: 'Electric',
    color: '#F2D94E',
    icon: 'src/icons/types/electric.svg',
    order: 4,
  },
  ice: {
    name: 'Ice',
    color: '#76D1C1',
    icon: 'src/icons/types/ice.svg',
    order: 5,
  },
  fighting: {
    name: 'Fighting',
    color: '#D3425F',
    icon: 'src/icons/types/fighting.svg',
    order: 6,
  },
  poison: {
    name: 'Poison',
    color: '#B763CF',
    icon: 'src/icons/types/poison.svg',
    order: 7,
  },
  ground: {
    name: 'Ground',
    color: '#DA7C4D',
    icon: 'src/icons/types/ground.svg',
    order: 8,
  },
  flying: {
    name: 'Flying',
    color: '#A1BBEC',
    icon: 'src/icons/types/flying.svg',
    order: 9,
  },
  psychic: {
    name: 'Psychic',
    color: '#FA8582',
    icon: 'src/icons/types/psychic.svg',
    order: 10,
  },
  bug: {
    name: 'Bug',
    color: '#9BBB31',
    icon: 'src/icons/types/bug.svg',
    order: 11,
  },
  rock: {
    name: 'Rock',
    color: '#C9BC8A',
    icon: 'src/icons/types/rock.svg',
    order: 12,
  },
  ghost: {
    name: 'Ghost',
    color: '#5F6DBC',
    icon: 'src/icons/types/ghost.svg',
    order: 13,
  },
  dragon: {
    name: 'Dragon',
    color: '#0C6AC8',
    icon: 'src/icons/types/dragon.svg',
    order: 14,
  },
  dark: {
    name: 'Dark',
    color: '#585761',
    icon: 'src/icons/types/dark.svg',
    order: 15,
  },
  steel: {
    name: 'Steel',
    color: '#5795A3',
    icon: 'src/icons/types/steel.svg',
    order: 16,
  },
  fairy: {
    name: 'Fairy',
    color: '#EF90E6',
    icon: 'src/icons/types/fairy.svg',
    order: 17,
  }
}
