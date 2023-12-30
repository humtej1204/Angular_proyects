import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { BasePokemonInfo } from 'src/app/models/pokemon.model';
import { ServiceService } from 'src/app/services/api-services/pokemon/service.service';
import { DialogService } from 'src/app/services/ui-services/dialog/dialog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private serviceService: ServiceService,
    private activatedRoute: ActivatedRoute,
    private dialogServ: DialogService
  ) {}

  pokemonData: BasePokemonInfo[] = [];

  paginatorOptions: IPaginatorOptions = {
    length: 0,
    pageSize: 20,
    pageIndex: 0,
    pageSizeOptions: [10, 20, 50, 100]
  }

  ngOnInit(): void {
    this.serviceService.pokemonCount$
      .subscribe(res => this.paginatorOptions.length = res)
    this.validateQueryParams();
    this.getPokemons();
  }

  private validateQueryParams() {
    this.activatedRoute.queryParamMap.subscribe(queryParams => {
      if (queryParams.get('page') && !!parseInt(queryParams.get('page')!)) {
        this.paginatorOptions.pageIndex = Number(queryParams.get('page')) - 1;
      }
      if (queryParams.get('size') && !!parseInt(queryParams.get('size')!)) {
        this.paginatorOptions.pageSize = Number(queryParams.get('size'));
      }
    });
  }

  getPokemons() {
    this.dialogServ.showLoading();
    const offset = this.paginatorOptions.pageIndex * this.paginatorOptions.pageSize;
    const limit = this.paginatorOptions.pageSize;

    this.serviceService.getPokemonsData(offset, limit)
    .pipe(
      finalize(() => this.dialogServ.closeDialog())
    )
    .subscribe((data: any) => {
      this.pokemonData = data;
    })
  }

  changePage(paginatorOptions: IPaginatorOptions) {
    this.paginatorOptions = paginatorOptions;
    this.getPokemons();
  }

  onSearchPokemon(input: string) {
    this.serviceService.getPokemon(String(input))
    .pipe(
      finalize(() => this.dialogServ.closeDialog())
    )
    .subscribe((data: any) => {
      this.pokemonData = [data];
    })
  }
}

interface IPaginatorOptions {
  length: number;
  pageSize: number;
  pageIndex: number;
  pageSizeOptions: number[];
}