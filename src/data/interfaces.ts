export interface Evs {
  hp?: number;
  atk?: number;
  def?: number;
  spa?: number;
  spd?: number;
  spe?: number;
}

export const STATS = {
  hp: {
    name: "HP",
    short: "HP",
  },
  atk: {
    name: "Attack",
    short: "Atk",
  },
  def: {
    name: "Defense",
    short: "Def",
  },
  spa: {
    name: "Special Attack",
    short: "SpA",
  },
  spd: {
    name: "Special Defense",
    short: "SpD",
  },
  spe: {
    name: "Speed",
    short: "Spe",
  }
}

export const GENERATIONS = [
	{
		id: 1,
		name: "Kanto",
		games: [
			"red",
			"blue",
			"yellow",
			"firered",
			"leafgreen",
			"lets-go-pikachu",
			"lets-go-eevee",
		],
	},
	{
		id: 2,
		name: "Johto",
		games: [
			"gold",
			"silver",
			"crystal",
			"heartgold",
			"soulsilver",
		]
	},
	{
		id: 3,
		name: "Hoenn",
		games: [
			"ruby",
			"sapphire",
			"emerald",
			"colosseum",
			"xd",
			"omega-ruby",
			"alpha-sapphire",
		]
	},
	{
		id: 4,
		name: "Sinnoh",
		games: [
			"diamond",
			"pearl",
			"platinum",
			"brilliant-diamond",
			"shining-pearl",
			"legends-arceus",
		]
	},
	{
		id: 5,
		name: "Unova",
		games: [
			"black",
			"white",
			"black-2",
			"white-2",
		]
	},
	{
		id: 6,
		name: "Kalos",
		games: [
			"x",
			"y",
		]
	},
	{
		id: 7,
		name: "Alola",
		games: [
			"sun",
			"moon",
			"ultra-sun",
			"ultra-moon",
		]
	},
	{
		id: 8,
		name: "Galar",
		games: [
			"sword",
			"shield",
			"the-isle-of-armor",
			"the-crown-tundra",
		]
	},
	{
		id: 9,
		name: "Paldea",
		games: [
			"scarlet",
			"violet",
			"the-teal-mask",
			"the-indigo-disk",
		]
	}
]