import { ProfissionalSolicitante } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProfissionalSolicitanteFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionalsolicitanteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/profissionaissolicitantes`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ProfissionalSolicitanteFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const profissionalsolicitantes = response;

        const resultado = {
          profissionalsolicitantes,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(profissionalsolicitante): Promise<ProfissionalSolicitante> {
    return this.http.post<ProfissionalSolicitante>(`${this.url}`, profissionalsolicitante).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const profissionalsolicitante = response as ProfissionalSolicitante;
        return profissionalsolicitante;
      });
  }

  Atualizar(profissionalsolicitante: ProfissionalSolicitante): Promise<any> {
    return this.http.put(`${this.url}/${profissionalsolicitante.codigo}`, profissionalsolicitante)
      .toPromise()
      .then(response => {
        const profissionalsolicitantealterado = response as ProfissionalSolicitante;
        return profissionalsolicitantealterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
