import { Component, OnInit } from '@angular/core';
import { AbreviaturaService } from './../../zservice/abreviatura.service';
import { AbreviaturaFiltro } from 'src/app/zservice/abreviatura.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Abreviatura } from 'src/app/core/model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-abreviaturas',
  templateUrl: './lista-abreviaturas.component.html',
  styleUrls: ['./lista-abreviaturas.component.css']
})
export class ListaAbreviaturasComponent implements OnInit {
  abreviaturas = [];
  totalRegistros = 0;
  filtro = new AbreviaturaFiltro();

  constructor(private service: AbreviaturaService, private formbuilder: FormBuilder, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.abreviaturas = response.abreviaturas.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(abreviatura: Abreviatura) {
    try {
      this.service.Remover(abreviatura.codigo);
      alert(abreviatura.texto + ' foi excluído');
      this.route.navigate(['/abreviaturas']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
