import { Modality } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ModalityFiltro {
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ModalityService {
  url: string;
  urlTeste: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/modalitys`;
    this.urlTeste = `${environment.apiUrl}/enviar`;
  }
  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ModalityFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const modalitys = response;

        const resultado = {
          modalitys,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(modality): Promise<Modality> {
    return this.http.post<Modality>(`${this.url}`, modality).toPromise();
  }

  EnvioTeste(modality: Modality): Promise<Modality> {
    return this.http.post<Modality>(`${this.urlTeste}`, modality).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const modality = response as Modality;
        return modality;
      });
  }

  Atualizar(modality: Modality): Promise<any> {
    return this.http.put(`${this.url}/${modality.codigo}`, modality)
      .toPromise()
      .then(response => {
        const modalityalterado = response as Modality;
        return modalityalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
