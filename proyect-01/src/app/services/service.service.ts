import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private http: HttpClient
  ) {}

  url = 'https://pokeapi.co/api/v2/pokemon'

  getAllPokemons(offset: number = 0, limit: number = 1154) {
    const url01 = `${this.url}?offset=${offset}&limit=${limit}`
    const data = this.http.get(url01);

    return data;
  }

  getPokemons(url: string) {
    const data = this.http.get(url);

    return data
  };
}
