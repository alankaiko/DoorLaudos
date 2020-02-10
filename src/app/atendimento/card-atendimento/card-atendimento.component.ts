import { Router } from '@angular/router';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento } from 'src/app/core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-atendimento',
  templateUrl: './card-atendimento.component.html',
  styleUrls: ['./card-atendimento.component.css']
})
export class CardAtendimentoComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('atend') atendimento: Atendimento;
  val: number = 5;

  constructor(private service: AtendimentoService,
              private route: Router) { }

  ngOnInit() {
  }

  Excluir(atendimento: Atendimento) {
    try {
      this.service.Remover(atendimento.codigo);
      alert(atendimento.patient.patientname + ' foi excluído');
      this.route.navigate(['/atendimento']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }
}
