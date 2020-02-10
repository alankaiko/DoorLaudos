import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
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

  constructor(private service: AtendimentoService,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.atendimentos = response.atendimentos.content;
      }).catch(erro => console.log(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
