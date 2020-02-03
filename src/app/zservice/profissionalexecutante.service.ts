import { ProfissionalExecutante } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProfissionalExecutanteFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionalexecutanteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/profissionaisexecutantes`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ProfissionalExecutanteFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const profissionalexecutantes = response;

        const resultado = {
          profissionalexecutantes,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(profissionalexecutante): Promise<ProfissionalExecutante> {
    return this.http.post<ProfissionalExecutante>(`${this.url}`, profissionalexecutante).toPromise();
  }

  BuscarPorId(codigo: number): Promise<ProfissionalExecutante> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const profissionalexecutante = response as ProfissionalExecutante;
        return profissionalexecutante;
      });
  }

  Atualizar(profissionalexecutante: ProfissionalExecutante): Promise<any> {
    return this.http.put(`${this.url}/${profissionalexecutante.codigo}`, profissionalexecutante)
      .toPromise()
      .then(response => {
        const profissionalexecutantealterado = response as ProfissionalExecutante;
        return profissionalexecutantealterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
