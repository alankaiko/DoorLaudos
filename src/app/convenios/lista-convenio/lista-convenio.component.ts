import { ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convenio } from 'src/app/core/model';
import { LazyLoadEvent } from 'primeng/api';
import { ConvenioFiltro } from 'src/app/zservice/convenio.service';

@Component({
  selector: 'app-lista-convenio',
  templateUrl: './lista-convenio.component.html',
  styleUrls: ['./lista-convenio.component.css']
})
export class ListaConvenioComponent implements OnInit {
  convenios = [];
  totalRegistros = 0;
  filtro = new ConvenioFiltro();

  constructor(private service: ConvenioService,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.convenios = response.convenios.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(convenio: Convenio) {
    try {
      this.service.Remover(convenio.codigo);
      alert(convenio.nome + ' foi excluído');
      this.route.navigate(['/convenios']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
