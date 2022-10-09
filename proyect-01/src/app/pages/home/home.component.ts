import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon.model';
import { ServiceService } from 'src/app/services/service.service';
import { PageEvent } from '@angular/material/paginator';

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
      img: data.sprites.other['official-artwork'].front_default,
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

    return (item);
  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.pokemonData.length) {
      endIndex = this.pokemonData.length;
    }

    this.pokemonArraySlice = this.pokemonData.slice(startIndex, endIndex);
  }

  onSearchPokemon(input: string) {
    const filteredPokemons = this.pokemonData
    .filter(poke => poke.name.includes(input));

    this.pokemonArraySlice = filteredPokemons;
  }

  typeColors: any = {
    normal: '#DDCCAA',
    fighting: '#FF6A6A',
    flying: '#BAAAFF',
    poison: '#CC88BB',
    ground: '#DEB887',
    rock: '#CD853F',
    bug: '#99CC33',
    ghost: '#778899',
    fire: '#FF7F00',
    water: '#B0E2FF',
    grass: '#99FF66',
    electric: '#FFD700',
    psychic: '#FFB5C5',
    ice: '#ADD8E6',
    dragon: '#AB82FF',
    dark: '#A9A9A9',
    fairy: '#FFB0FF',
    steel: '#CCCCCC'
  };
}
