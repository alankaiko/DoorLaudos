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
          label: 'Cadastros',
          items: [
            {label: 'Convênio', icon: 'fa fa-refresh', routerLink: ['convenios']},
            {label: 'Exames e Procedimentos Médicos', icon: 'fa fa-repeat', routerLink: ['procedimentomedico']},
            {label: 'Grupo de Exames e Procedimentos', icon: 'fa fa-refresh', routerLink: ['grupoprocedimento']},
            {label: 'Pacientes', icon: 'fa fa-refresh'},
            {label: 'Profissionais Executantes', icon: 'fa fa-refresh', routerLink: ['profissionalexecutante']},
            {label: 'Profissionais Solicitantes', icon: 'fa fa-refresh', routerLink: ['profissionalsolicitante']},
            {label: 'Textos Pessoais', icon: 'fa fa-refresh', routerLink: ['textopessoal']},
            {label: 'Abreviaturas', icon: 'fa fa-refresh', routerLink: ['abreviaturas']}
          ]
        },
        {
          label: 'Operações'
        },
        {
          label: 'Relatórios'
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
          label: 'Server',
          items: [
            {label: 'Listagem', icon: 'fa fa-refresh', routerLink: ['servidor']},
            {label: 'Preview', icon: 'fa fa-refresh', routerLink: ['previsualizar']},
            {label: 'Visualizar', icon: 'fa fa-refresh', routerLink: ['viewer']}
        ]
        }
      ];
    }



}
