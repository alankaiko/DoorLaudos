import { CrmService, CrmFiltro } from './../../zservice/crm.service';
import { Component, OnInit } from '@angular/core';
import { Crm } from './../../core/model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-crm',
  templateUrl: './lista-crm.component.html',
  styleUrls: ['./lista-crm.component.css']
})
export class ListaCrmComponent implements OnInit {
  listacrm = [];
  totalRegistros = 0;
  filtro = new CrmFiltro();

  constructor(private service: CrmService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.listacrm = response.crms.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(crm: Crm) {
    try {
      this.service.Remover(crm.codigo);
      alert(crm.codigo + ' foi excluído');
      this.route.navigate(['/listacrm']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
