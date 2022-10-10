import { Component, OnInit } from '@angular/core';

import { BasePokemonInfo } from '../../models/pokemon.model';
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

  pokemonData: BasePokemonInfo[] = [];
  pokemonArraySlice: BasePokemonInfo[] = [];

  paginatorOptions: any = {
    length: 0,
    pageSizeOptions: [10, 20, 50, 100]
  }

  ngOnInit(): void {
    this.getData();
  }

  getData () {
    this.serviceService.getAllPokemons().subscribe((data: any) => {
      this.pokemonData = data;
      this.paginatorOptions.length = this.pokemonData.length;
      this.pokemonArraySlice = this.pokemonData.slice(0, 20);
    });
  }

  onSearchPokemon(input: string) {
    const filteredPokemons = this.pokemonData
    .filter(poke => poke.name.includes(input));

    this.pokemonArraySlice = filteredPokemons;
  }
}
