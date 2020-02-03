import { Abreviatura } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class AbreviaturaFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class AbreviaturaService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/abreviaturas`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: AbreviaturaFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const abreviaturas = response;

        const resultado = {
          abreviaturas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(abreviatura): Promise<Abreviatura> {
    return this.http.post<Abreviatura>(`${this.url}`, abreviatura).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const abreviatura = response as Abreviatura;
        return abreviatura;
      });
  }

  Atualizar(abreviatura: Abreviatura): Promise<any> {
    return this.http.put(`${this.url}/${abreviatura.codigo}`, abreviatura)
      .toPromise()
      .then(response => {
        const abreviaturaalterado = response as Abreviatura;
        return abreviaturaalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
