import { CBHPM } from './../../core/model';
import { CbhpmFiltro, CbhpmService } from './../../zservice/cbhpm.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';


@Component({
  selector: 'app-lista-cbhpm',
  templateUrl: './lista-cbhpm.component.html',
  styleUrls: ['./lista-cbhpm.component.css']
})
export class ListaCbhpmComponent implements OnInit {
  lista = [];
  totalRegistros = 0;
  filtro = new CbhpmFiltro();

  constructor(private service: CbhpmService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.lista = response.cbhpms.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(cbhpm: CBHPM) {
    try {
      this.service.Remover(cbhpm.codigo);
      alert(cbhpm.sku + ' foi excluído');
      this.route.navigate(['/listacbhpm']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
