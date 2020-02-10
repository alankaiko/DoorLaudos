import { Convenio } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ConvenioFiltro {
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment .apiUrl}/convenios`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ConvenioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const convenios = response;

        const resultado = {
          convenios,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(convenio): Promise<Convenio> {
    return this.http.post<Convenio>(`${this.url}`, convenio).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const convenio = response as Convenio;
        return convenio;
      });
  }

  Atualizar(convenio: Convenio): Promise<any> {
    return this.http.put(`${this.url}/${convenio.codigo}`, convenio)
      .toPromise()
      .then(response => {
        const convenioalterado = response as Convenio;
        return convenioalterado;
      });
  }

  Remover(codigo: number): Promise<void> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
