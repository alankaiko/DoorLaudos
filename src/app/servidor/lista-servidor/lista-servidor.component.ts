import { ServidorService, PatientFiltro } from './../../zservice/servidor.service';
import { Patient } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LazyLoadEvent, TreeNode } from 'primeng/api';

@Component({
  selector: 'app-lista-servidor',
  templateUrl: './lista-servidor.component.html',
  styleUrls: ['./lista-servidor.component.css']
})
export class ListaServidorComponent implements OnInit {
  patients = [];
  patient = new Patient();
  formulario: FormGroup;
  totalRegistros = 0;
  filtro = new PatientFiltro();

  constructor(private service: ServidorService , private formbuilder: FormBuilder) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.patients = response.patients.content;
      }).catch(erro => console.log(erro));
  }


  BuscarPeloId(patient: Patient) {
    this.service.BuscarPorId(patient.idpatient).then(response => { this.formulario.patchValue(response); });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
