import { Component, OnInit } from '@angular/core';
import { GrupoCID10 } from './../../core/model';
import { GrupocidService } from './../../zservice/grupocid.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { GrupocidFiltro } from 'src/app/zservice/grupocid.service';

@Component({
  selector: 'app-lista-cid10',
  templateUrl: './lista-cid10.component.html',
  styleUrls: ['./lista-cid10.component.css']
})
export class ListaCid10Component implements OnInit {
  listacid = [];
  totalRegistros = 0;
  filtro = new GrupocidFiltro();

  constructor(private service: GrupocidService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.listacid = response.grupocids.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(grupocids: GrupoCID10) {
    try {
      this.service.Remover(grupocids.codigo);
      alert(grupocids.nome + ' foi excluído');
      this.route.navigate(['/listacid']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
