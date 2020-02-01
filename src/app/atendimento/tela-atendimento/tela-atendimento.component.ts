import { ProcedimentoAtendimento } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  items: FormArray;
  pacientes: any[];
  convenios: any[];
  solicitantes: any[];
  pacienteselecionado: number;
  convenioselecionado: number;
  solicitanteselecionado: number;

  constructor(private service: AtendimentoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router) {
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
      patient: this.formbuilder.group({
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
    this.service.BuscarPorId(codigo).then(atendimento => this.formulario.patchValue(atendimento));
  }

  Salvar() {
    console.log(JSON.stringify(this.atendimento));
  //  if (this.editando) {
  //    this.AtualizarAtendimento();
  //    this.route.navigate(['/atendimento']);
  //  } else {
  //    this.formulario.patchValue(this.AdicionarAtendimento());
  //    this.route.navigate(['/atendimento']);
  //  }
  //  this.CriarFormulario(new Atendimento());
  }

  AdicionarAtendimento() {
    return this.service.Adicionar(this.formulario.value);
  }

  AtualizarConvenios() {
    this.service.Atualizar(this.formulario.value)
      .then(convenio => {this.formulario.patchValue(convenio); });
  }

  AtualizarAtendimento() {
    this.service.Atualizar(this.formulario.value)
      .then(atendimento => this.formulario.patchValue(atendimento));
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
