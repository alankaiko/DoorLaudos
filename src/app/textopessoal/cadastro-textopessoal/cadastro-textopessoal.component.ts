import { TextoPessoal } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TextopessoalService } from 'src/app/zservice/textopessoal.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-textopessoal',
  templateUrl: './cadastro-textopessoal.component.html',
  styleUrls: ['./cadastro-textopessoal.component.css']
})
export class CadastroTextopessoalComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: TextopessoalService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new TextoPessoal());
    const codtextopessoal = this.rota.snapshot.params.cod;

    if (codtextopessoal) {
      this.CarretarTextoPessoal(codtextopessoal);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(texto: TextoPessoal) {
    this.formulario = this.formbuilder.group({
      codigo: [null, texto.codigo],
      abreviatura: [null, texto.abreviatura],
      texto: [null, texto.texto]
    });
  }

  CarretarTextoPessoal(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarTextoPessoal();
    } else {
      this.formulario.patchValue(this.AdicionarTextoPessoal());
      this.route.navigate(['/textopessoal/novo']);
    }
    this.CriarFormulario(new TextoPessoal());
  }

  AdicionarTextoPessoal() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/textopessoal']);
      });
  }

  AtualizarTextoPessoal() {
    this.service.Atualizar(this.formulario.value)
      .then(texto => {
        this.formulario.patchValue(texto);
        this.route.navigate(['/textopessoal']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
