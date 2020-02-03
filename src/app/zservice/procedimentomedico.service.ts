import { ProcedimentoMedico } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProcedimentoMedicoFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ProcedimentomedicoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/procedimentomedicos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ProcedimentoMedicoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const procedimentos = response;

        const resultado = {
          procedimentos,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(procedimento): Promise<ProcedimentoMedico> {
    return this.http.post<ProcedimentoMedico>(`${this.url}`, procedimento).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const procedimento = response as ProcedimentoMedico;
        return procedimento;
      });
  }

  Atualizar(procedimento: ProcedimentoMedico): Promise<any> {
    return this.http.put(`${this.url}/${procedimento.codigo}`, procedimento)
      .toPromise()
      .then(response => {
        const procedimentoalterado = response as ProcedimentoMedico;
        return procedimentoalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
