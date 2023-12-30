import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Pokemon } from 'src/app/models/pokemon.model';

import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute
  ) { }

  pokemonId: string | null = '';

  pokemonInfo: Pokemon = {
    id: 0,
    name: '',
    types: [],
    img: '',
    weight: 0,
    height: 0,
    stats: [],
    moves: [],
  };

  pokeStats: any = {
    hp: {
      maxValue: 255,
      color: '#d63944',
    },
    attack: {
      maxValue: 190,
      color: '#faaa22',
    },
    defense: {
      maxValue: 250,
      color: '#1891df',
    },
    'special-attack': {
      maxValue: 194,
      color: '#fa70a1',
    },
    'special-defense': {
      maxValue: 250,
      color: '#14b0d1',
    },
    speed: {
      maxValue: 200,
      color: '#448247',
    },
  };

  types: any = {
    normal: {
      color: '#DDCCAA',
    },
    fighting: {
      color: '#FF6A6A',
    },
    flying: {
      color: '#BAAAFF',
    },
    poison: {
      color: '#CC88BB',
    },
    ground: {
      color: '#DEB887',
    },
    rock: {
      color: '#CD853F',
    },
    bug: {
      color: '#99CC33',
    },
    ghost: {
      color: '#778899',
    },
    fire: {
      color: '#FF7F00',
    },
    water: {
      color: '#B0E2FF',
    },
    grass: {
      color: '#99FF66',
    },
    electric: {
      color: '#FFD700',
    },
    psychic: {
      color: '#FFB5C5',
    },
    ice: {
      color: '#ADD8E6',
    },
    dragon: {
      color: '#AB82FF',
    },
    dark: {
      color: '#A9A9A9',
    },
    fairy: {
      color: '#FFB0FF',
    },
    steel: {
      color: '#CCCCCC',
    }
  };

  pokemonType: string = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pokemonId = params.get('pokeId');
      if (this.pokemonId) {
        this.getPokemonData(this.pokemonId);
      }
    });
  }

  getPokemonData(id: string) {
    this.serviceService.getPokemon(id).subscribe((data: Pokemon) => {
      this.pokemonInfo = data;
      this.pokemonType = this.types[this.pokemonInfo.types[0]].image;
    });
  }

  getProgressWith(cant:number, total:number) {
    const value = (cant / total) * 100;
    return (value.toFixed(2) + '%');
  }

  goNext() {
    if (this.pokemonInfo.id == 905) {
      return ('10001');
    } else if (this.pokemonInfo.id == 10249) {
      return ('1');
    }
    return (this.pokemonInfo.id + 1);
  }

  goPrev() {
    if (this.pokemonInfo.id === 1) {
      return ('10249');
    } else if (this.pokemonInfo.id === 10001) {
      return ('905');
    }
    return (this.pokemonInfo.id - 1);
  }
}
