import { CBHPM } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CbhpmFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class CbhpmService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/cbhpms`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: CbhpmFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const cbhpms = response;

        const resultado = {
          cbhpms,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(cbhpm) {
    return this.http.post(`${this.url}`, cbhpm).subscribe(response => response);
  }

  BuscarPorId(id: number): Promise<any> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        const cbhpm = response as CBHPM;
        return cbhpm;
      });
  }

  Atualizar(cbhpm: CBHPM): Promise<any> {
    return this.http.put(`${this.url}/${cbhpm.codigo}`, cbhpm)
      .toPromise()
      .then(response => {
        const cbhpmalterado = response as CBHPM;
        return cbhpmalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
