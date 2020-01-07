import { Crm } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CrmFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/crms`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: CrmFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const crms = response;

        const resultado = {
          crms,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(crm) {
    return this.http.post(`${this.url}`, crm).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const crm = response as Crm;
        return crm;
      });
  }

  Atualizar(crm: Crm): Promise<any> {
    return this.http.put(`${this.url}/${crm.codigo}`, crm)
      .toPromise()
      .then(response => {
        const crmalterado = response as Crm;
        return crmalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
