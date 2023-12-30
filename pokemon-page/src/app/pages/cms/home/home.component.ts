import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePokemonInfo } from 'src/app/models/pokemon.model';

import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private activatedRoute: ActivatedRoute,
  ) {}

  pokemonData: BasePokemonInfo[] = [];
  pokemonArraySlice: BasePokemonInfo[] = [];

  paginatorOptions: any = {
    length: 0,
    pageSize: 20,
    pageIndex: 0,
    pageSizeOptions: [10, 20, 50, 100]
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams.get('pageIndex')) {
        this.paginatorOptions.pageIndex = queryParams.get('pageIndex');
      }
      if (queryParams.get('pageSize')) {
        const pageSize = parseInt(String(queryParams.get('pageSize')));
        this.paginatorOptions.pageSize = pageSize;
      }
    });
    this.getData();
  }

  getData () {
    this.serviceService.getAllPokemons().subscribe((data: any) => {
      const startItem = this.paginatorOptions.pageIndex * this.paginatorOptions.pageSize;

      this.pokemonData = data;
      this.paginatorOptions.length = this.pokemonData.length;

      this.pokemonArraySlice = this.pokemonData
        .slice(startItem, (startItem + this.paginatorOptions.pageSize));
    });
  }

  onSearchPokemon(input: string) {
    const filteredPokemons = this.pokemonData
    .filter(poke => poke.name.includes(input));

    this.pokemonArraySlice = filteredPokemons;
  }
}
