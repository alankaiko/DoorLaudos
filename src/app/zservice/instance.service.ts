import { Instance } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ResumoInstance {
  idinstance: number;
  mediastoragesopinstanceuid: string;
  tagimagem: number;
}

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  url: string;
  urltags: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/instances`;
    this.urltags = `${environment.apiUrl}/tagimagens`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Adicionar(instance) {
    return this.http.post(`${this.url}`, instance).subscribe(response => response);
  }

  BuscarPorId(idinstance: number): Promise<any> {
    return this.http.get(`${this.url}/${idinstance}`)
      .toPromise()
      .then(response => {
        const instance = response as Instance;
        return instance;
      });
  }

  ResumoProDicom(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}?resumo`)
      .toPromise()
      .then(response => {
        const instance = response as ResumoInstance;
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

  BuscarTagImgGamb(codigo: number): Promise<any> {
    return this.http.get(`${this.urltags}/tab/${codigo}`)
      .toPromise()
      .then(response => response);
  }
}
