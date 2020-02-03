import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { Component, OnInit } from '@angular/core';
import { ProfissionalExecutante } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-profissionalexec',
  templateUrl: './cadastro-profissionalexec.component.html',
  styleUrls: ['./cadastro-profissionalexec.component.css']
})
export class CadastroProfissionalexecComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: ProfissionalexecutanteService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProfissionalExecutante());
    const codprofissionalexec = this.rota.snapshot.params.cod;

    if (codprofissionalexec) {
      this.CarregarProfissionalExecutante(codprofissionalexec);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(profissional: ProfissionalExecutante) {
    this.formulario = this.formbuilder.group({
      codigo: [null, profissional.codigo],
      nome: [null, profissional.nome],
      numnoconselho: [null, profissional.numnoconselho],
      contato: this.formbuilder.group({
        email: [profissional.contato.email],
        telefone: [profissional.contato.telefone],
        telefone2: [profissional.contato.telefone2],
        celular: [profissional.contato.celular]
      }),
      endereco: this.formbuilder.group({
        logradouro: [profissional.endereco.logradouro],
        complemento: [profissional.endereco.complemento],
        numero: [profissional.endereco.numero],
        bairro: [profissional.endereco.bairro],
        cidade: [profissional.endereco.cidade],
        estado: [profissional.endereco.estado],
        cep: [profissional.endereco.cep]
      }),
      conselho: this.formbuilder.group({
        codigo: [profissional.conselho.codigo],
        sigla: [profissional.conselho.sigla],
        descricao: [profissional.conselho.descricao]
      }),
    });
  }

  CarregarProfissionalExecutante(codigo: number) {
    this.service.BuscarPorId(codigo).then(profissional => this.formulario.patchValue(profissional));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarProfissionalExecutante();

    } else {
      this.formulario.patchValue(this.AdicionarProfissionalExecutante());
    }
    this.CriarFormulario(new ProfissionalExecutante());
  }

  AdicionarProfissionalExecutante() {
    return this.service.Adicionar(this.formulario.value)
      .then(response => {
        this.route.navigate(['/profissionalexecutante']);
      });
  }

  AtualizarProfissionalExecutante() {
    this.service.Atualizar(this.formulario.value)
      .then(profissional => {
        this.formulario.patchValue(profissional);
        this.route.navigate(['/profissionalexecutante']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
