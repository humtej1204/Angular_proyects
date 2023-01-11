import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  constructor(
    private http: HttpClient,
  ) { }

  // GET
  getAllCommerce() {
    const url = 'http://localhost:8011/comercio/v1/obtenerComercioAllCrud';

    return this.http.get(url);
  }

  getUsersByMerchantId(id: string) {
    const url = 'http://localhost:8044/usuario/v1/obtener/';

    return this.http.get(url + id);
  }

  getCommerceByFilter(data: any) {
    const url = 'http://localhost:8011/comercio/v1/obtenerComercioFiltros';
    let filterParams = new HttpParams();

    if (data.nit !== '' && data.nit.length >= 3)
      filterParams = filterParams.append('codigoNIT', data.nit);
    else if (data.codeUnique !== '' && data.codeUnique.length >= 3)
      filterParams = filterParams.append('codigoUnico', data.codeUnique);
    else if (data.terminal !== '' && data.terminal.length >= 3)
      filterParams = filterParams.append('terminal', data.terminal.toUpperCase());

    return this.http.get(url, {params: filterParams}).pipe(
      map((data: any) => data.resultado)
    );
  }

  getAllUsers() {
    const url = 'http://localhost:8044/usuario/v1/listarUsuariosCrud';

    return this.http.get(url).pipe(
      map((data: any) => data.resultado)
    );
  }

  // POST
  createCommerce(data: any) {
    const url = 'http://localhost:8011/comercio/v1/solicitarRegistroComercio';

    return this.http.post(url, data);
  }

  createUniqueCode(data: any, commerceId: string) {
    const url = 'http://localhost:8011/comercio/v1/solicitarRegistroCodigoUnico/' + commerceId;

    return this.http.post(url, data);
  }

  createTerminal(data: any, uniqueCode: string) {
    const url = 'http://localhost:8011/comercio/v1/solicitarRegistroTerminal/' + uniqueCode;

    return this.http.post(url, data);
  }

  associatedUsers(data: any) {
    const url = 'http://localhost:8044/usuario/v1/registrarComercio';

    return this.http.post(url, data);
  }

  // PUT
  updateCommerce(data: any) {
    const url = 'http://localhost:8011/comercio/v1/actualizarNit';

    return this.http.post(url, data).pipe(
      map((data: any) => data.resultado)
    );
  }

  updateUniqueCode(data: any, commerceId: string) {
    const url = 'http://localhost:8011/comercio/v1/actualizarCodigoUnico';

    return this.http.post(url, data).pipe(
      map((data: any) => data.resultado)
    );
  }

  updateTerminal(data: any, uniqueCode: string) {
    const url = 'http://localhost:8011/comercio/v1/solicitarRegistroTerminal/' + uniqueCode;

    return this.http.post(url, data).pipe(
      map((data: any) => data.resultado)
    );
  }

  // DELETE
  deleteCommerce(commerceId: string) {
    const url = 'http://localhost:8011/comercio/v1/eliminarComercio/' + commerceId;

    return this.http.delete(url);
  }

  deleteUniqueCode(commerceId: string, uniqueCode: string) {
    const url = 'http://localhost:8011/comercio/v1/eliminarCodigoUnico/' + commerceId + '/' + uniqueCode;

    return this.http.delete(url);
  }

  deleteTerminal(commerceId: string, terminal: string) {
    const url = 'http://localhost:8011/comercio/v1/eliminarTerminal/' + commerceId + '/' + terminal;

    return this.http.delete(url);
  }

}
