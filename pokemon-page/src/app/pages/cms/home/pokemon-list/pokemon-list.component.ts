import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

/* Modelos */
import { BasePokemonInfo } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {

  constructor() { }

  @Input() pokemonData: BasePokemonInfo[] = [];
  @Input() paginatorOptions: any = {
    length: 0,
    pageSize: 0,
    pageIndex: 0,
    pageSizeOptions: []
  }
  @Output() changePage = new EventEmitter<any>();

  onPageChange(event: PageEvent) {
    this.paginatorOptions = {
      ...this.paginatorOptions,
      length: event.length,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex,
    }
    this.changePage.emit(this.paginatorOptions);
  }
}
