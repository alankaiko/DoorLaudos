import { CNES } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CnesFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class CnesService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/cness`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: CnesFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const cness = response;

        const resultado = {
          cness,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(cnes) {
    return this.http.post(`${this.url}`, cnes).subscribe(response => response);
  }

  BuscarPorId(id: number): Promise<any> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        const cnes = response as CNES;
        return cnes;
      });
  }

  Atualizar(cnes: CNES): Promise<any> {
    return this.http.put(`${this.url}/${cnes.codigo}`, cnes)
      .toPromise()
      .then(response => {
        const cnesalterado = response as CNES;
        return cnesalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
