import { Atendimento, Patient, Convenio, ProfissionalSolicitante } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class AtendimentoFilter {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  url: string;
  conveniourl: string;
  pacienteurl: string;
  solicitanteurl: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/atendimentos`;
    this.conveniourl = `${environment.apiUrl}/convenios`;
    this.pacienteurl = `${environment.apiUrl}/servidor`;
    this.solicitanteurl = `${environment.apiUrl}/profissionaissolicitantes`;
   }

   Listar() {
     return this.http.get(`${this.url}`).toPromise().then(response => response);
   }

   Consultar(filtro: AtendimentoFilter): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
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

   Adicionar(atendimento: Atendimento): Promise<Atendimento> {
    return this.http.post<Atendimento>(this.url, atendimento).toPromise();
   }

   BuscarPorId(codigo: number): Promise<any> {
     return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const atendimento = response as Atendimento;
        this.converterStringsParaDatas([atendimento]);

        return atendimento;
      });

   }

   Atualizar(atendimento: Atendimento): Promise<any> {
     return this.http.put(`${this.url}/${atendimento.codigo}`, atendimento)
      .toPromise()
      .then(response => {
        const atendimentoalterado = response as Atendimento;
        this.converterStringsParaDatas([atendimentoalterado]);
        return atendimentoalterado;
      });
   }

   Remover(codigo: number) {
     this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
   }

  ListarPacientes(): Promise<Patient[]> {
    return this.http.get<Patient[]>(this.pacienteurl).toPromise();
  }

  ListarConvenios(): Promise<Convenio[]> {
    return this.http.get<Convenio[]>(this.conveniourl).toPromise();
  }

  ListarSolicitantes(): Promise<ProfissionalSolicitante[]> {
    return this.http.get<ProfissionalSolicitante[]>(this.solicitanteurl).toPromise();
  }

  private converterStringsParaDatas(atendimentos: Atendimento[]) {
    for (const atendimento of atendimentos) {
      atendimento.dataatendimento = moment(atendimento.dataatendimento, 'YYYY-MM-DD').toDate();

      for (const proc of atendimento.procedimentos) {
        proc.dataexecucao = moment(proc.dataexecucao, 'YYYY-MM-DD').toDate();
        proc.preventregalaudo = moment(proc.dataexecucao, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
