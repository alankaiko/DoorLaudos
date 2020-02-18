import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalityService } from 'src/app/zservice/modality.service';
import {Location} from '@angular/common';
import { Modality } from 'src/app/core/model';

@Component({
  selector: 'app-cadastro-maquinas',
  templateUrl: './cadastro-maquinas.component.html',
  styleUrls: ['./cadastro-maquinas.component.css']
})
export class CadastroMaquinasComponent implements OnInit {
  formulario: FormGroup;
  modalidade = new Modality();

  constructor(
    private service: ModalityService,
    private rota: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.CriarFormulario(new Modality());
    const codmodality = this.rota.snapshot.params.cod;

    if (codmodality) {
      this.CarregarModality(codmodality);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(modality: Modality) {
    this.formulario = this.formbuilder.group({
      codigo: [null, modality.codigo],
      name: [null, modality.name],
      description: [null, modality.description],
      ip: [null, modality.ip],
      port: [null, modality.port],
    });
  }

  CarregarModality(codigo: number) {
    this.service.BuscarPorId(codigo).then(modality => this.formulario.patchValue(modality));
    this.service.BuscarPorId(codigo).then(modality => { this.modalidade = modality; });
  }

  Testar() {
    this.service.EnvioTeste(this.modalidade);
  }

  Imprimir() {
    console.log(JSON.stringify(this.modalidade));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarModality();
    } else {
      this.formulario.patchValue(this.AdicionarModality());
    }
    this.CriarFormulario(new Modality());
  }

  AdicionarModality() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/modalite']);
      });

  }

  AtualizarModality() {
    this.service.Atualizar(this.formulario.value)
      .then(modality => {
        this.formulario.patchValue(modality);
        this.route.navigate(['/modalite']);
      });
  }

  Voltar() {
    this.location.back();
  }

}
