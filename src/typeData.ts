
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
        icon: require('./icons/types/normal.svg').default,
        order: 0,
    },
    fire: {
        name: 'Fire',
        color: '#FBA64C',
        icon: require('./icons/types/fire.svg').default,
        order: 1,
    },
    water: {
        name: 'Water',
        color: '#539DDF',
        icon: require('./icons/types/water.svg').default,
        order: 2,
    },
    grass: {
        name: 'Grass',
        color: '#60BD58',
        icon: require('./icons/types/grass.svg').default,
        order: 3,
    },
    electric: {
        name: 'Electric',
        color: '#F2D94E',
        icon: require('./icons/types/electric.svg').default,
        order: 4,
    },
    ice: {
        name: 'Ice',
        color: '#76D1C1',
        icon: require('./icons/types/ice.svg').default,
        order: 5,
    },
    fighting: {
        name: 'Fighting',
        color: '#D3425F',
        icon: require('./icons/types/fighting.svg').default,
        order: 6,
    },
    poison: {
        name: 'Poison',
        color: '#B763CF',
        icon: require('./icons/types/poison.svg').default,
        order: 7,
    },
    ground: {
        name: 'Ground',
        color: '#DA7C4D',
        icon: require('./icons/types/ground.svg').default,
        order: 8,
    },
    flying: {
        name: 'Flying',
        color: '#A1BBEC',
        icon: require('./icons/types/flying.svg').default,
        order: 9,
    },
    psychic: {
        name: 'Psychic',
        color: '#FA8582',
        icon: require('./icons/types/psychic.svg').default,
        order: 10,
    },
    bug: {
        name: 'Bug',
        color: '#9BBB31',
        icon: require('./icons/types/bug.svg').default,
        order: 11,
    },
    rock: {
        name: 'Rock',
        color: '#C9BC8A',
        icon: require('./icons/types/rock.svg').default,
        order: 12,
    },
    ghost: {
        name: 'Ghost',
        color: '#5F6DBC',
        icon: require('./icons/types/ghost.svg').default,
        order: 13,
    },
    dragon: {
        name: 'Dragon',
        color: '#0C6AC8',
        icon: require('./icons/types/dragon.svg').default,
        order: 14,
    },
    dark: {
        name: 'Dark',
        color: '#585761',
        icon: require('./icons/types/dark.svg').default,
        order: 15,
    },
    steel: {
        name: 'Steel',
        color: '#5795A3',
        icon: require('./icons/types/steel.svg').default,
        order: 16,
    },
    fairy: {
        name: 'Fairy',
        color: '#EF90E6',
        icon: require('./icons/types/fairy.svg').default,
        order: 17,
    }
}