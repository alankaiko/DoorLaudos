import { ProfissionalSolicitante } from './../../core/model';
import { ProfissionalsolicitanteService } from './../../zservice/profissionalsolicitante.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-profissionalsol',
  templateUrl: './cadastro-profissionalsol.component.html',
  styleUrls: ['./cadastro-profissionalsol.component.css']
})
export class CadastroProfissionalsolComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: ProfissionalsolicitanteService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProfissionalSolicitante());
    const codprofissionalsol = this.rota.snapshot.params.cod;

    if (codprofissionalsol) {
      this.CarregarProfissionalSolicitante(codprofissionalsol);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(profissional: ProfissionalSolicitante) {
    this.formulario = this.formbuilder.group({
      codigo: [null, profissional.codigo],
      nome: [null, profissional.nome],
      numnoconselho: [null, profissional.numnoconselho],
      conselho: this.formbuilder.group({
        codigo: [profissional.conselho.codigo],
        sigla: [profissional.conselho.sigla],
        descricao: [profissional.conselho.descricao]
      }),
    });
  }

  CarregarProfissionalSolicitante(codigo: number) {
    this.service.BuscarPorId(codigo).then(profissional => this.formulario.patchValue(profissional));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarProfissionalSolicitante();
    } else {
      this.formulario.patchValue(this.AdicionarProfissionalSolicitante());
    }
    this.CriarFormulario(new ProfissionalSolicitante());
  }

  AdicionarProfissionalSolicitante() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/profissionalsolicitante']);
      });
  }

  AtualizarProfissionalSolicitante() {
    this.service.Atualizar(this.formulario.value)
      .then(profissional => {
        this.formulario.patchValue(profissional);
        this.route.navigate(['/profissionalsolicitante']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
