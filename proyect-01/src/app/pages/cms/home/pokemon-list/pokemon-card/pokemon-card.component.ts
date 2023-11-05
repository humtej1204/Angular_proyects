import { Component, Input, OnInit } from '@angular/core';

import { BasePokemonInfo } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  constructor() { }

  @Input() pokemon: BasePokemonInfo = {
    id: 0,
    name: '',
    types: [],
    img: '',
  };

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

  ngOnInit(): void {
  }
}
