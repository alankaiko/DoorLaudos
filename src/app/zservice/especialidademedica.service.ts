import { EspecialidadeMedica } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class EspecialidadeMedicaFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class EspecialidademedicaService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/especialidademedicas`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: EspecialidadeMedicaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const especialidades = response;

        const resultado = {
          especialidades,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(especialidades) {
    return this.http.post(`${this.url}`, especialidades).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const especialidade = response as EspecialidadeMedica;
        return especialidade;
      });
  }

  Atualizar(especialidade: EspecialidadeMedica): Promise<any> {
    return this.http.put(`${this.url}/${especialidade.codigo}`, especialidade)
      .toPromise()
      .then(response => {
        const especialidadealterado = response as EspecialidadeMedica;
        return especialidadealterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
