import { GrupoProcedimento } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class GrupoProcedimentoFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class GrupoprocedimentoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/grupoprocedimentos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: GrupoProcedimentoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const grupoprocedimentos = response;

        const resultado = {
          grupoprocedimentos,
          total: response.totalElements
        };

        return resultado;
      });
    }


  Adicionar(grupoprocedimento): Promise<GrupoProcedimento> {
    return this.http.post<GrupoProcedimento>(`${this.url}`, grupoprocedimento).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const grupoprocedimento = response as GrupoProcedimento;
        return grupoprocedimento;
      });
  }

  Atualizar(grupoprocedimento: GrupoProcedimento): Promise<any> {
    return this.http.put(`${this.url}/${grupoprocedimento.codigo}`, grupoprocedimento)
      .toPromise()
      .then(response => {
        const grupoprocedimentoalterado = response as GrupoProcedimento;
        return grupoprocedimentoalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
