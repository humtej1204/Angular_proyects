import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

/* Modelos */
import { BasePokemonInfo } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  constructor() { }

  @Input() pokemonData: BasePokemonInfo[] = [];
  @Input() pokemonArraySlice: BasePokemonInfo[] = [];
  @Input() paginatorOptions: any = {
    length: 0,
    pageSize: 0,
    pageIndex: 0,
    pageSizeOptions: []
  }

  ngOnInit(): void { }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.pokemonData.length) {
      endIndex = this.pokemonData.length;
    }

    this.pokemonArraySlice = this.pokemonData.slice(startIndex, endIndex);
    this.paginatorOptions.pageSize = event.pageSize;
  }
}
