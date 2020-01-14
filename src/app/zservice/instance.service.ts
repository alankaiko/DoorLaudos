import { Instance } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/instances`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Adicionar(instance) {
    return this.http.post(`${this.url}`, instance).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const instance = response as Instance;
        return instance;
      });
  }

  Atualizar(instance: Instance): Promise<any> {
    return this.http.put(`${this.url}/${instance.idinstance}`, instance)
      .toPromise()
      .then(response => {
        const instancealterado = response as Instance;
        return instancealterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }
}
