import { Atendimento } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class AtendimentoFilter {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/atendimentos`;
   }

   Listar() {
     return this.http.get(`${this.url}`).toPromise().then(response => response);
   }

   Consultar(filtro: AtendimentoFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`)
    .toPromise()
    .then(response => {
      const atendimentos = response;

      const resultado = {
        atendimentos,
        total: response.totalElements
      };

      return resultado;
    });
   }

   Adicionar(atendimento) {
    return this.http.post(`${this.url}`, atendimento).subscribe(response => response);
   }

   BuscarPorId(codigo: number): Promise<any> {
     return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const atendimento = response as Atendimento;
        return atendimento;
      });

   }

   Atualizar(atendimento: Atendimento): Promise<any> {
     return this.http.put(`${this.url}/${atendimento.codigo}`, atendimento)
      .toPromise()
      .then(response => {
        const atendimentoalterado = response as Atendimento;
        return atendimentoalterado;
      });
   }

   Remover(codigo: number) {
     this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
   }
}
