export interface Pokemon {
  id: number,
  name: string,
  types: string[],
  img: string,
  weight: number,
  height: number,
  stats: any[],
  moves: string[],
}

export interface BasePokemonInfo {
  id: number,
  name: string,
  types: string[],
  img: string,
}

export interface PokemonFirstInfo {
  name: string,
  url: string,
}
