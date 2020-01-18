import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AtendimentoFilter, AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/core/model';

@Component({
  selector: 'app-lista-atendimento',
  templateUrl: './lista-atendimento.component.html',
  styleUrls: ['./lista-atendimento.component.css']
})
export class ListaAtendimentoComponent implements OnInit {
  atendimentos = [];
  totalRegistros = 0;
  filtro = new AtendimentoFilter();

  constructor(private service: AtendimentoService, private formbuilder: FormBuilder, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.atendimentos = response.atendimentos.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(atendimento: Atendimento) {
    try {
      this.service.Remover(atendimento.codigo);
      alert(atendimento.paciente.patientname + ' foi excluído');
      this.route.navigate(['/atendimento']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
