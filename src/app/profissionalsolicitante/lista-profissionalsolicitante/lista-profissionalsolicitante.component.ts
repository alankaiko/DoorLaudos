import { ProfissionalSolicitanteFiltro, ProfissionalsolicitanteService } from './../../zservice/profissionalsolicitante.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfissionalSolicitante } from 'src/app/core/model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-profissionalsolicitante',
  templateUrl: './lista-profissionalsolicitante.component.html',
  styleUrls: ['./lista-profissionalsolicitante.component.css']
})
export class ListaProfissionalsolicitanteComponent implements OnInit {
  profissionaissol = [];
  totalRegistros = 0;
  filtro = new ProfissionalSolicitanteFiltro();

  constructor(private service: ProfissionalsolicitanteService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaissol = response.profissionalsolicitantes.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(profissionalsol: ProfissionalSolicitante) {
    try {
      this.service.Remover(profissionalsol.codigo);
      alert(profissionalsol.nome + ' foi excluído');
      this.route.navigate(['/profissionalsolicitante']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
