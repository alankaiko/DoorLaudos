import { ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { Convenio } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
              private route: Router) {
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
        logradouro: [convenio.endereco.logradouro],
        complemento: [convenio.endereco.complemento],
        numero: [convenio.endereco.numero],
        bairro: [convenio.endereco.bairro],
        cidade: [convenio.endereco.cidade],
        estado: [convenio.endereco.estado],
        cep: [convenio.endereco.cep]
      }),
    });
  }

  CarregarConvenios(codigo: number) {
    this.service.BuscarPorId(codigo).then(convenio => this.formulario.patchValue(convenio));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarConvenios();
      this.route.navigate(['/convenios']);
    } else {
      this.formulario.patchValue(this.AdicionarConvenios());
      this.route.navigate(['/convenios/novo']);
    }
    this.CriarFormulario(new Convenio());
  }

  AdicionarConvenios() {
    return this.service.Adicionar(this.formulario.value);
  }

  AtualizarConvenios() {
    this.service.Atualizar(this.formulario.value)
      .then(convenio => {this.formulario.patchValue(convenio); });
  }

}
