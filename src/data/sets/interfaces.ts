export interface SmogonSet {
  setName: string;
  moves: string[][];
  ability: string[];
  item: string[];
  nature: string[];
  evs: Evs;
}

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