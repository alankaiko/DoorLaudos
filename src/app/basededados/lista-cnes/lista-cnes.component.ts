import { CnesService } from './../../zservice/cnes.service';
import { Component, OnInit } from '@angular/core';
import { CNES } from './../../core/model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { CnesFiltro } from 'src/app/zservice/cnes.service';

@Component({
  selector: 'app-lista-cnes',
  templateUrl: './lista-cnes.component.html',
  styleUrls: ['./lista-cnes.component.css']
})
export class ListaCnesComponent implements OnInit {
  listacnes = [];
  totalRegistros = 0;
  filtro = new CnesFiltro();

  constructor(private service: CnesService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.listacnes = response.cness.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(cnes: CNES) {
    try {
      this.service.Remover(cnes.codigo);
      alert(cnes.sku + ' foi excluído');
      this.route.navigate(['/listacnes']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
