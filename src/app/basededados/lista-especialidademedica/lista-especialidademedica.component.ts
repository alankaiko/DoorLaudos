import { EspecialidadeMedicaFiltro, EspecialidademedicaService } from './../../zservice/especialidademedica.service';
import { Component, OnInit } from '@angular/core';
import { EspecialidadeMedica } from './../../core/model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-especialidademedica',
  templateUrl: './lista-especialidademedica.component.html',
  styleUrls: ['./lista-especialidademedica.component.css']
})
export class ListaEspecialidademedicaComponent implements OnInit {
  especialidades = [];
  totalRegistros = 0;
  filtro = new EspecialidadeMedicaFiltro();

  constructor(private service: EspecialidademedicaService,
              private formbuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.especialidades = response.especialidades.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(especialidades: EspecialidadeMedica) {
    try {
      this.service.Remover(especialidades.codigo);
      alert(especialidades.nome + ' foi excluído');
      this.route.navigate(['/listaespecialidades']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
