import { ProcedimentoAtendimento } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/core/model';

@Component({
  selector: 'app-tela-atendimento',
  templateUrl: './tela-atendimento.component.html',
  styleUrls: ['./tela-atendimento.component.css']
})
export class TelaAtendimentoComponent implements OnInit {
  atendimento = new Atendimento();
  items: FormArray;
  pacientes: any[];
  convenios: any[];
  solicitantes: any[];
  pacienteselecionado: number;
  convenioselecionado: number;
  solicitanteselecionado: number;

  constructor(private service: AtendimentoService,
              private rota: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit() {
    const codatendimento = this.rota.snapshot.params.cod;

    this.CarregarConvenios();
    this.CarregarPacientes();
    this.CarregarSolicitantes();

    if (codatendimento) {
      this.CarregaAtendimento(codatendimento);
    }
  }

  teste() {
    console.log(JSON.stringify(this.atendimento));
  }

  get editando() {
    return Boolean(this.atendimento.codigo);
  }

  CarregaAtendimento(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(atendimento => {
        this.atendimento = atendimento;
      }).catch(erro => erro);
  }

  Salvar(form: FormControl) {
    if (this.editando) {
      this.Atualizar(form);
    } else {
      this.Adicionar(form);
    }
  }

  Adicionar(form: FormControl) {
    this.service.Adicionar(this.atendimento)
      .then(atendimentoaAdicionado => {
        this.route.navigate(['/atendimento', atendimentoaAdicionado.codigo]);
      })
      .catch(erro => erro);
  }

  Atualizar(form: FormControl) {
    this.service.Atualizar(this.atendimento)
      .then(atendimento => {
        this.atendimento = atendimento;

      })
      .catch(erro => erro);
  }

  Nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.atendimento = new Atendimento();
    }.bind(this), 1);

    this.route.navigate(['/atendimento/novo']);
  }




  CarregarPacientes() {
    this.service.ListarPacientes().then(lista => {
      this.pacientes = lista.map(patient => ({label: patient.patientname, value: patient.idpatient}));
    }).catch(erro => erro);
  }

  CarregarConvenios() {
    this.service.ListarConvenios().then(lista => {
      this.convenios = lista.map(convenio => ({label: convenio.nome, value: convenio.codigo}));
    }).catch(erro => erro);
  }

  CarregarSolicitantes() {
    this.service.ListarSolicitantes().then(lista => {
      this.solicitantes = lista.map(solicitante => ({label: solicitante.nome, value: solicitante.codigo}));
    }).catch(erro => erro);
  }
}
