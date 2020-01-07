import { ProfissionalExecutanteFiltro, ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfissionalExecutante } from 'src/app/core/model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-profissionalexecutante',
  templateUrl: './lista-profissionalexecutante.component.html',
  styleUrls: ['./lista-profissionalexecutante.component.css']
})
export class ListaProfissionalexecutanteComponent implements OnInit {
  profissionaisexec = [];
  totalRegistros = 0;
  filtro = new ProfissionalExecutanteFiltro();

  constructor(private service: ProfissionalexecutanteService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaisexec = response.profissionalexecutantes.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(profissionalexec: ProfissionalExecutante) {
    try {
      this.service.Remover(profissionalexec.codigo);
      alert(profissionalexec.nome + ' foi excluído');
      this.route.navigate(['/profissionalexecutante']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
