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

export interface PokemonTypes {
  'normal': PokemonTypeInfo,
  'fighting': PokemonTypeInfo,
  'flying': PokemonTypeInfo,
  'poison': PokemonTypeInfo,
  'ground': PokemonTypeInfo,
  'rock': PokemonTypeInfo,
  'bug': PokemonTypeInfo,
  'ghost': PokemonTypeInfo,
  'fire': PokemonTypeInfo,
  'water': PokemonTypeInfo,
  'grass': PokemonTypeInfo,
  'electric': PokemonTypeInfo,
  'psychic': PokemonTypeInfo,
  'ice': PokemonTypeInfo,
  'dragon': PokemonTypeInfo,
  'dark': PokemonTypeInfo,
  'fairy': PokemonTypeInfo,
  'steel': PokemonTypeInfo,
}

export interface PokemonTypeInfo {
  color: string,
  image: string,
}
