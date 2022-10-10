import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
  ) {}

  pokemonData: Pokemon[] = [];
  pokemonArraySlice: Pokemon[] = [];

  paginatorOptions: any = {
    length: 0,
    pageSizeOptions: [10, 20, 50, 100]
  }

  ngOnInit(): void {
    this.getData();
  }

  getData () {
    this.serviceService.getAllPokemons().subscribe((data: any) => {
      data.results.map((data: any) => {
        const pokeInfo = this.getPokemones(data.url);

        this.pokemonData.push(pokeInfo);
      });

      this.paginatorOptions.length = this.pokemonData.length;
      this.pokemonArraySlice = this.pokemonData.slice(0, 20);
    });
  }

  getPokemones(url: string) {
    const data = this.serviceService.getPokemons(url);
    let pokeInfo: Pokemon = {
      id: 0,
      name: '',
      types: [],
      img: '',
      weight: 0,
      height: 0,
      stats: [],
      moves: [],
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

  onSearchPokemon(input: string) {
    const filteredPokemons = this.pokemonData
    .filter(poke => poke.name.includes(input));

    this.pokemonArraySlice = filteredPokemons;
  }
}
