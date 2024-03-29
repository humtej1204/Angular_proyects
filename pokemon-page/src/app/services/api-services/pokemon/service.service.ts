import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { PokemonFirstInfo, BasePokemonInfo, Pokemon } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  private pokemonCount = new BehaviorSubject<number>(0);
  pokemonCount$ = this.pokemonCount.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  url = 'https://pokeapi.co/api/v2/pokemon'


  getPokemonsData(offset: number = 0, limit: number = 100000) {
    const url01 = `${this.url}?offset=${offset}&limit=${limit}`
    return this.http.get<any>(url01)
    .pipe(
      tap(res => this.pokemonCount.next(res.count)),
      map(item => item.results.map((pokemon: PokemonFirstInfo) => {
        return this.getPokemones(pokemon.url);
      })
    ));
  }

  getPokemon(id: string | number) {
    return this.http.get(`${this.url}/${id}`)
      .pipe(
        map((data) => this.moldPokemonData(data))
      );
  };

  getPokemons(url: string) {
    return this.http.get(url);
  };

  getPokemones(url: string) {
    const data = this.getPokemons(url);
    let pokeInfo: BasePokemonInfo = {
      id: 0,
      name: '',
      types: [],
      img: '',
    };

    data.subscribe((data: any) => {
      const item: Pokemon = this.moldPokemonData(data);

      Object.assign(pokeInfo, item);
    });

    return pokeInfo;
  };

  moldPokemonData(data: any): Pokemon {
    const item: Pokemon = {
      id: data.id,
      name: data.name,
      weight: data.weight,
      height: data.height,
      stats: [],
      types: [],
      moves: [],
      img: '',
    }

    item.stats = data.stats.map((e: any) => {
      return (
        {name: e.stat.name, base_stat: e.base_stat}
      );
    });

    item.types = data.types.map((e: any) => {
      return (e.type.name);
    });

    item.moves = data.moves.map((e: any) => {
      return (e.move.name);
    });

    item.img = (data.sprites.other['official-artwork'].front_default === null)
      ? 'https://img.icons8.com/color/480/nothing-found.png'
      : data.sprites.other['official-artwork'].front_default;

    return (item);
  }
}
