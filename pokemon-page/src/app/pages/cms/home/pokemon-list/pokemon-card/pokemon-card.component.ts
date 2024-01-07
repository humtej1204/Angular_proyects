import { Component, Input, OnInit } from '@angular/core';

import { BasePokemonInfo } from 'src/app/models/pokemon.model';
import { POKEMON_TYPES } from 'src/app/utils/const';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  typeColors = POKEMON_TYPES;

  constructor() { }

  @Input() pokemon: BasePokemonInfo = {
    id: 0,
    name: '',
    types: [],
    img: '',
  };

  ngOnInit(): void {
  }
}
