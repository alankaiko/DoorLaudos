import { GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { Component, OnInit } from '@angular/core';
import { ProcedimentoMedico } from './../../core/model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-procedimentomedico',
  templateUrl: './cadastro-procedimentomedico.component.html',
  styleUrls: ['./cadastro-procedimentomedico.component.css']
})
export class CadastroProcedimentomedicoComponent implements OnInit {
  formulario: FormGroup;
  grupos = [];

  constructor(private service: ProcedimentomedicoService,
              private rota: ActivatedRoute,
              private serviceGrupo: GrupoprocedimentoService,
              private formbuilder: FormBuilder,
              private route: Router) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProcedimentoMedico());
    const codprocedimentomedico = this.rota.snapshot.params.cod;

    if (codprocedimentomedico) {
      this.CarregarProcedimentoMedico(codprocedimentomedico);
    }

    this.BuscarGrupos();
  }

  BuscarGrupos() {
    return this.serviceGrupo.Listar()
    .then(grupos => {
      this.grupos = grupos
        .map(g => ({ label: g.nome, value: g.codigo }));
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(procedimentomedico: ProcedimentoMedico) {
    this.formulario = this.formbuilder.group({
      codigo: [null, procedimentomedico.codigo],
      nome: [null, procedimentomedico.nome],
      grupo: this.formbuilder.group({
        codigo: [procedimentomedico.grupo.codigo],
        nome: [procedimentomedico.grupo.nome],
      }),
    });
  }

  CarregarProcedimentoMedico(codigo: number) {
    this.service.BuscarPorId(codigo).then(procedimento => this.formulario.patchValue(procedimento));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarProcedimentoMedico();
      this.route.navigate(['/procedimentomedico']);
    } else {
      this.formulario.patchValue(this.AdicionarProcedimentoMedico());
      this.route.navigate(['/procedimentomedico/novo']);
    }
    this.CriarFormulario(new ProcedimentoMedico());
  }

  AdicionarProcedimentoMedico() {
    return this.service.Adicionar(this.formulario.value);
  }

  AtualizarProcedimentoMedico() {
    this.service.Atualizar(this.formulario.value)
      .then(procedimento => {this.formulario.patchValue(procedimento); });
  }

}
