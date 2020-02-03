import { GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { Component, OnInit } from '@angular/core';
import { GrupoProcedimento } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-grupoprocedimento',
  templateUrl: './cadastro-grupoprocedimento.component.html',
  styleUrls: ['./cadastro-grupoprocedimento.component.css']
})
export class CadastroGrupoprocedimentoComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: GrupoprocedimentoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new GrupoProcedimento());
    const codigogrupo = this.rota.snapshot.params.cod;

    if (codigogrupo) {
      this.CarregarGrupoProcedimento(codigogrupo);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(grupo: GrupoProcedimento) {
    this.formulario = this.formbuilder.group({
      codigo: [null, grupo.codigo],
      nome: [null, grupo.nome]
    });
  }

  CarregarGrupoProcedimento(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarGrupoProcedimento();
    } else {
      this.formulario.patchValue(this.AdicionarGrupoProcedimento());
    }
    this.CriarFormulario(new GrupoProcedimento());
  }

  AdicionarGrupoProcedimento() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/grupoprocedimento']);
      });
  }

  AtualizarGrupoProcedimento() {
    this.service.Atualizar(this.formulario.value)
      .then(grupo => {
        this.formulario.patchValue(grupo);
        this.route.navigate(['/grupoprocedimento']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
