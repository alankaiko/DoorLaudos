import { ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { Convenio } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-convenio',
  templateUrl: './cadastro-convenio.component.html',
  styleUrls: ['./cadastro-convenio.component.css']
})
export class CadastroConvenioComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: ConvenioService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Convenio());
    const codconvenio = this.rota.snapshot.params.cod;

    if (codconvenio) {
      this.CarregarConvenios(codconvenio);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(convenio: Convenio) {
    this.formulario = this.formbuilder.group({
      codigo: [null, convenio.codigo],
      nome: [null, convenio.nome],
      nomedocontato: [null, convenio.nomedocontato],
      telefone: [null, convenio.telefone],
      fax: [null, convenio.fax],
      ativo: [null, convenio.ativo],
      email: [null, convenio.email],
      observacoes: [null, convenio.observacoes],
      numcopiasdolaudo: [null, convenio.numcopiasdolaudo],
      endereco: this.formbuilder.group({
        logradouro: [null, convenio.endereco.logradouro],
        complemento: [null, convenio.endereco.complemento],
        numero: [null, convenio.endereco.numero],
        bairro: [null, convenio.endereco.bairro],
        cidade: [null, convenio.endereco.cidade],
        estado: [null, convenio.endereco.estado],
        cep: [null, convenio.endereco.cep]
      })
    });
  }

  CarregarConvenios(codigo: number) {
    this.service.BuscarPorId(codigo).then(convenio => this.formulario.patchValue(convenio));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarConvenios();
    } else {
      this.formulario.patchValue(this.AdicionarConvenios());
    }
    this.CriarFormulario(new Convenio());
  }

  AdicionarConvenios() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/convenios']);
      });
  }

  AtualizarConvenios() {
    this.service.Atualizar(this.formulario.value)
      .then(convenio => {
        this.formulario.patchValue(convenio);
        this.route.navigate(['/convenios']);
      });
  }

  Voltar() {
    this.location.back();
  }

}
