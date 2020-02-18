import { LazyLoadEvent } from 'primeng/api';
import { Router } from '@angular/router';
import { ModalityFiltro, ModalityService } from './../../zservice/modality.service';
import { Component, OnInit } from '@angular/core';
import { Modality } from 'src/app/core/model';

@Component({
  selector: 'app-lista-maquinas',
  templateUrl: './lista-maquinas.component.html',
  styleUrls: ['./lista-maquinas.component.css']
})
export class ListaMaquinasComponent implements OnInit {
  modalitys = [];
  totalRegistros = 0;
  filtro = new ModalityFiltro();

  constructor(private service: ModalityService, private route: Router) { }

  ngOnInit() {
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.modalitys = response.modalitys.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(modality: Modality) {
    try {
      this.service.Remover(modality.codigo)
        .then(() => {
          alert(modality.name + ' foi excluído');
          this.route.navigate(['/modalite']);
        });
    } catch (error) {
      console.log('erro ao excluir');
    }
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
