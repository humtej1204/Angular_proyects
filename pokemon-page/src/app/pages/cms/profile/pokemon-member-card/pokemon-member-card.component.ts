import { Component, Input, OnInit } from '@angular/core';
import { BasePokemonInfo } from 'src/app/models/pokemon.model';
import { ServiceService } from 'src/app/services/api-services/pokemon/service.service';
import { POKEMON_TYPES } from 'src/app/utils/const';

@Component({
  selector: 'pokemon-member-card',
  templateUrl: './pokemon-member-card.component.html',
  styleUrls: ['./pokemon-member-card.component.scss']
})
export class PokemonMemberCardComponent implements OnInit {
  @Input('pokemonId') pokemonId!: number;

  pokemonData!: BasePokemonInfo;

  constructor(
    private pokemonServ: ServiceService,
  ) { }

  ngOnInit(): void {
    this.pokemonServ.getPokemon(this.pokemonId)
    .subscribe((res: BasePokemonInfo) => this.pokemonData = res)
  }

  getTypeIcon(type: string): string {
    return `url('/assets/pokemon/types/${type}.svg')`;
  }

  getTypeColor(type: string): string {
    return POKEMON_TYPES[type]?.color;
  }
}
