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
      maxValue: 120,
      color: '#faaa22',
    },
    defense: {
      maxValue: 180,
      color: '#1891df',
    },
    'special-attack': {
      maxValue: 175,
      color: '#fa70a1',
    },
    'special-defense': {
      maxValue: 110,
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
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg'
    },
    fighting: {
      color: '#FF6A6A',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg'
    },
    flying: {
      color: '#BAAAFF',
      image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg'
    },
    poison: {
      color: '#CC88BB',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg'
    },
    ground: {
      color: '#DEB887',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg'
    },
    rock: {
      color: '#CD853F',
      image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg'
    },
    bug: {
      color: '#99CC33',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg'
    },
    ghost: {
      color: '#778899',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg'
    },
    fire: {
      color: '#FF7F00',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg'
    },
    water: {
      color: '#B0E2FF',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg'
    },
    grass: {
      color: '#99FF66',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg'
    },
    electric: {
      color: '#FFD700',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg'
    },
    psychic: {
      color: '#FFB5C5',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg'
    },
    ice: {
      color: '#ADD8E6',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg'
    },
    dragon: {
      color: '#AB82FF',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg'
    },
    dark: {
      color: '#A9A9A9',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg'
    },
    fairy: {
      color: '#FFB0FF',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg'
    },
    steel: {
      color: '#CCCCCC',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg'
    }
  };

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
    });
  }

  getProgressWith(cant:number, total:number) {
    const value = (cant / total) * 100;
    return (value.toFixed(2) + '%');
  }
}
