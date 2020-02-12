import { ActivatedRoute } from '@angular/router';
import { Patient, Study } from './../../core/model';
import { ServidorService } from './../../zservice/servidor.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-previsualizacao',
  templateUrl: './previsualizacao.component.html',
  styleUrls: ['./previsualizacao.component.css']
})
export class PrevisualizacaoComponent implements OnInit {
  patient: Patient;
  estudos: Study[];

  constructor(private service: ServidorService, private route: ActivatedRoute) { }

  ngOnInit() {
    const idpatient = this.route.snapshot.params.idpatient;

    if (idpatient) {
      this.CarregarDadosPatient(idpatient);
    }
  }

  CarregarDadosPatient(idpatient: number) {
    this.service.BuscarPorId(idpatient).then(response => this.patient = response);
    this.service.BuscarEstudosDoPaciente(idpatient).then(response => {this.estudos = response, console.log(this.estudos)});
  }

}
