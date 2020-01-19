import { ProfissionalsolicitanteService } from './../../zservice/profissionalsolicitante.service';
import { ConvenioService } from './../../zservice/convenio.service';
import { ServidorService } from './../../zservice/servidor.service';
import { Patient, Convenio, ProfissionalSolicitante } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/core/model';

@Component({
  selector: 'app-tela-atendimento',
  templateUrl: './tela-atendimento.component.html',
  styleUrls: ['./tela-atendimento.component.css']
})
export class TelaAtendimentoComponent implements OnInit {
  atendimento = new Atendimento();
  formulario: FormGroup;
  pacientes: [];
  convenios: [];
  solicitantes: [];
  pacienteselecionado: number;
  convenioselecionado: number;
  solicitanteselecionado: number;

  constructor(private service: AtendimentoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private patientService: ServidorService,
              private convenioService: ConvenioService,
              private solicitanteService: ProfissionalsolicitanteService) {
  }

  ngOnInit() {
    this.CriarFormulario(new Atendimento());
    const codabreviatura = this.rota.snapshot.params.cod;

    this.CarregarConvenios();
    this.CarregarPacientes();
    this.CarregarSolicitantes();

    if (codabreviatura) {
      this.CarregarAtendimento(codabreviatura);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(atendimento: Atendimento) {
    this.formulario = this.formbuilder.group({
      codigo: [null, atendimento.codigo],
      dataatendimento: [null, atendimento.dataatendimento],
      observacoes: [null, atendimento.observacoes],
      paciente: this.formbuilder.group({
        idpatient: [null, Validators.required]
      }),
      convenio: this.formbuilder.group({
        codigo: [null, Validators.required]
      }),
      solicitante: this.formbuilder.group({
        codigo: [null, Validators.required]
      })
    });
  }

  CarregarAtendimento(codigo: number) {
    this.service.BuscarPorId(codigo)
      .then(atendimento => {
        this.atendimento = atendimento;
      }).catch(erro => erro);
  }



  Salvar(form: FormControl) {
    if (this.editando) {
      this.AtualizarAtendimento(form);
    } else {
      this.AdicionarAtendimento(form);
    }
  }

  AdicionarAtendimento(form: FormControl) {
    return this.service.Adicionar(this.atendimento)
      .then(response => response).catch(erro => erro);
  }

  AtualizarAtendimento(form: FormControl) {
    this.service.Atualizar(this.atendimento)
      .then(atendimento => {
        this.atendimento = atendimento;
      }).catch(erro => erro);
  }

  Novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.atendimento = new Atendimento();
    }.bind(this), 1);

    this.route.navigate(['/atendimento/novo']);
  }


  CarregarPacientes() {
    this.patientService.Listar().then(lista => {
      this.pacientes = lista.map(patient => ({label: patient.patientname, value: patient.idpatient}));
    }).catch(erro => erro);
  }

  CarregarConvenios() {
    this.convenioService.Listar().then(lista => {
      this.convenios = lista.map(convenio => ({label: convenio.nome, value: convenio.codigo}));
    }).catch(erro => erro);
  }

  CarregarSolicitantes() {
    this.solicitanteService.Listar().then(lista => {
      this.solicitantes = lista.map(solicitante => ({label: solicitante.nome, value: solicitante.codigo}));
    }).catch(erro => erro);
  }
}
