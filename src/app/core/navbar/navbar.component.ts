import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
items: MenuItem[];

    ngOnInit() {

      this.items = [
        {
          label: 'Operações',
          items: [
            {label: 'Atendimento', icon: 'fa fa-fw fa-file-image-o', routerLink: ['atendimento']},
            {label: 'Laudo', icon: 'fa fa-fw fa-file-image-o', routerLink: ['laudos']}
          ]
        },
        {
          label: 'Cadastros',
          items: [
            {label: 'Convênio', icon: 'fa fa-fw fa-cubes', routerLink: ['convenios']},
            {label: 'Grupo de Exames', icon: 'fa fa-fw fa-cubes', routerLink: ['grupoprocedimento']},
            {label: 'Ex. e Proc. Médicos', icon: 'fa fa-fw fa-cubes', routerLink: ['procedimentomedico']},
            {label: 'Pacientes', icon: 'fa fa-fw fa-cubes', routerLink: ['paciente']},
            {label: 'Prof. Executantes', icon: 'fa fa-fw fa-cubes', routerLink: ['profissionalexecutante']},
            {label: 'Prof. Solicitantes', icon: 'fa fa-fw fa-cubes', routerLink: ['profissionalsolicitante']},
            {label: 'Textos Pessoais', icon: 'fa fa-fw fa-cubes', routerLink: ['textopessoal']},
            {label: 'Abreviaturas', icon: 'fa fa-fw fa-cubes', routerLink: ['abreviaturas']}
          ]
        },
        {
          label: 'Base de Dados',
          items: [
              {label: 'CBHPM', icon: 'fa fa-refresh', routerLink: ['listacbhpm']},
              {label: 'CID10', icon: 'fa fa-repeat', routerLink: ['listacid']},
              {label: 'CNES', icon: 'fa fa-refresh', routerLink: ['listacnes']},
              {label: 'CRM', icon: 'fa fa-repeat', routerLink: ['listacrm']},
              {label: 'Especialidade Médica', icon: 'fa fa-refresh', routerLink: ['listaespecialidades']}
          ]
        },
        {
          label: 'Ferramentas'
        },
        {
          label: 'Relatórios'
        },
        {
          label: 'Server',
          items: [
            {label: 'Listagem', icon: 'fa fa-fw fa-server', routerLink: ['servidor']}
        ]
        }
      ];
    }



}
