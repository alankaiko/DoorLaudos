import { TextoPessoalFiltro, TextopessoalService } from './../../zservice/textopessoal.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TextoPessoal } from 'src/app/core/model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-textopessoal',
  templateUrl: './lista-textopessoal.component.html',
  styleUrls: ['./lista-textopessoal.component.css']
})
export class ListaTextopessoalComponent implements OnInit {
  textospessoais = [];
  totalRegistros = 0;
  filtro = new TextoPessoalFiltro();

  constructor(private service: TextopessoalService, private formbuilder: FormBuilder, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.textospessoais = response.textopessoals.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(textopessoal: TextoPessoal) {
    try {
      this.service.Remover(textopessoal.codigo);
      alert(textopessoal.abreviatura + ' foi excluído');
      this.route.navigate(['/textopessoal']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
