import { GrupoCID10 } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class GrupocidFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class GrupocidService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/grupocid10s`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: GrupocidFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const grupocids = response;

        const resultado = {
          grupocids,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(grupocid) {
    return this.http.post(`${this.url}`, grupocid).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const grupocid = response as GrupoCID10;
        return grupocid;
      });
  }

  Atualizar(grupocid: GrupoCID10): Promise<any> {
    return this.http.put(`${this.url}/${grupocid.codigo}`, grupocid)
      .toPromise()
      .then(response => {
        const grupocidalterado = response as GrupoCID10;
        return grupocidalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
