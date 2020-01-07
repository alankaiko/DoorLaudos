import { TextoPessoal } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class TextoPessoalFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class TextopessoalService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/textospessoais`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: TextoPessoalFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const textopessoals = response;

        const resultado = {
          textopessoals,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(textopessoal) {
    return this.http.post(`${this.url}`, textopessoal).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const textopessoal = response as TextoPessoal;
        return textopessoal;
      });
  }

  Atualizar(textopessoal: TextoPessoal): Promise<any> {
    return this.http.put(`${this.url}/${textopessoal.codigo}`, textopessoal)
      .toPromise()
      .then(response => {
        const textopessoalalterado = response as TextoPessoal;
        return textopessoalalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
