
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
    icon: 'typeIcons/normal.svg',
    order: 0,
  },
  fire: {
    name: 'Fire',
    color: '#FBA64C',
    icon: 'typeIcons/fire.svg',
    order: 1,
  },
  water: {
    name: 'Water',
    color: '#539DDF',
    icon: 'typeIcons/water.svg',
    order: 2,
  },
  grass: {
    name: 'Grass',
    color: '#60BD58',
    icon: 'typeIcons/grass.svg',
    order: 3,
  },
  electric: {
    name: 'Electric',
    color: '#F2D94E',
    icon: 'typeIcons/electric.svg',
    order: 4,
  },
  ice: {
    name: 'Ice',
    color: '#76D1C1',
    icon: 'typeIcons/ice.svg',
    order: 5,
  },
  fighting: {
    name: 'Fighting',
    color: '#D3425F',
    icon: 'typeIcons/fighting.svg',
    order: 6,
  },
  poison: {
    name: 'Poison',
    color: '#B763CF',
    icon: 'typeIcons/poison.svg',
    order: 7,
  },
  ground: {
    name: 'Ground',
    color: '#DA7C4D',
    icon: 'typeIcons/ground.svg',
    order: 8,
  },
  flying: {
    name: 'Flying',
    color: '#A1BBEC',
    icon: 'typeIcons/flying.svg',
    order: 9,
  },
  psychic: {
    name: 'Psychic',
    color: '#FA8582',
    icon: 'typeIcons/psychic.svg',
    order: 10,
  },
  bug: {
    name: 'Bug',
    color: '#9BBB31',
    icon: 'typeIcons/bug.svg',
    order: 11,
  },
  rock: {
    name: 'Rock',
    color: '#C9BC8A',
    icon: 'typeIcons/rock.svg',
    order: 12,
  },
  ghost: {
    name: 'Ghost',
    color: '#5F6DBC',
    icon: 'typeIcons/ghost.svg',
    order: 13,
  },
  dragon: {
    name: 'Dragon',
    color: '#0C6AC8',
    icon: 'typeIcons/dragon.svg',
    order: 14,
  },
  dark: {
    name: 'Dark',
    color: '#585761',
    icon: 'typeIcons/dark.svg',
    order: 15,
  },
  steel: {
    name: 'Steel',
    color: '#5795A3',
    icon: 'typeIcons/steel.svg',
    order: 16,
  },
  fairy: {
    name: 'Fairy',
    color: '#EF90E6',
    icon: 'typeIcons/fairy.svg',
    order: 17,
  }
}
