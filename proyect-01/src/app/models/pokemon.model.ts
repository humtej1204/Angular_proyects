export interface Pokemon {
  id: number,
  name: string,
  types: string[],
  img: string,
  weight: number,
  height: number,
  stats: Object[],
  moves: string[],
}

export interface PokemonFirstInfo {
  name: string,
  url: string,
}
