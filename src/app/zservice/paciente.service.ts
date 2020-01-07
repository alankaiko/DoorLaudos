import { Paciente } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PacientesFiltro {
  pagina = 0;
  itensPorPagina = 7;
}


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/pacientes`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: PacientesFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const pacientes = response;

        const resultado = {
          pacientes,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(paciente) {
    return this.http.post(`${this.url}`, paciente).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const paciente = response as Paciente;
        return paciente;
      });
  }

  Atualizar(paciente: Paciente): Promise<any> {
    return this.http.put(`${this.url}/${paciente.codigo}`, paciente)
      .toPromise()
      .then(response => {
        const pacientealterado = response as Paciente;
        return pacientealterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
