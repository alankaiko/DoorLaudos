import { AbreviaturaService } from './../../zservice/abreviatura.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Abreviatura } from 'src/app/core/model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-abreviatura',
  templateUrl: './cadastro-abreviatura.component.html',
  styleUrls: ['./cadastro-abreviatura.component.css']
})
export class CadastroAbreviaturaComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private service: AbreviaturaService,
    private rota: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Abreviatura());
    const codabreviatura = this.rota.snapshot.params.cod;

    if (codabreviatura) {
      this.CarregarAbreviaturas(codabreviatura);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(abreviatura: Abreviatura) {
    this.formulario = this.formbuilder.group({
      codigo: [null, abreviatura.codigo],
      titulo: [null, abreviatura.titulo],
      texto: [null, abreviatura.texto]
    });
  }

  CarregarAbreviaturas(codigo: number) {
    this.service.BuscarPorId(codigo).then(abreviatura => this.formulario.patchValue(abreviatura));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarAbreviatura();
    } else {
      this.formulario.patchValue(this.AdicionarAbreviatura());
    }
    this.CriarFormulario(new Abreviatura());
  }

  AdicionarAbreviatura() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/abreviaturas']);
      });

  }

  AtualizarAbreviatura() {
    this.service.Atualizar(this.formulario.value)
      .then(abreviatura => {
        this.formulario.patchValue(abreviatura);
        this.route.navigate(['/abreviaturas']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
