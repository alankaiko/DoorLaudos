import { TreeNode } from 'primeng/api';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient } from '../core/model';

export class PatientFiltro {
  patientid: string;
  patientname: string;
  patientage: string;
  patientsex: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/servidor`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: PatientFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.patientid) {
      params = params.append('patientid', filtro.patientid);
    }

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const patients = response;

        const resultado = {
          patients,
          total: response.totalElements
        };

        return resultado;
      });
  }

  BuscarPorId(idpatient: number): Promise<any> {
    return this.http.get(`${this.url}/${idpatient}`)
      .toPromise()
      .then(response => {
        const patient = response as Patient;
        return patient;
      });
  }

  BuscarUrlBuscaImagem(instanceuid: any) {
    return `${this.url}/dicom/${instanceuid}`;
  }

  BuscarInstanciasDoPaciente(idpatient: number): Promise<any> {
    return this.http.get<any>(`${this.url}/series/${idpatient}`).toPromise().then(response => response);
  }
}
