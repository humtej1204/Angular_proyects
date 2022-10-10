import { Component, OnInit } from '@angular/core';
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
  ) { }

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
    hp: 100,
    attack: 200,
    defense: 100,
    'special-attack': 200,
    'special-defense': 200,
    speed: 200,
  };

  ngOnInit(): void {
    this.serviceService.getPokemon(200).subscribe((data: Pokemon) => {
      this.pokemonInfo = data;
    });
  }

}
