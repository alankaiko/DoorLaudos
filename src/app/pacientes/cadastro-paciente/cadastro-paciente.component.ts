import { PacienteService } from './../../zservice/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: PacienteService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Patient());
    const idpatient = this.rota.snapshot.params.cod;

    if (idpatient) {
      this.CarregarPaciente(idpatient);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('idpatient').value);
  }

  CriarFormulario(paciente: Patient) {
    this.formulario = this.formbuilder.group({
      idpatient: [null, paciente.idpatient],
      patientid: [null, paciente.patientid],
      patientname: [null, paciente.patientname],
      birthday: [null, paciente.birthday],
      patientage: [null, paciente.patientage],
      patientsex: [null, paciente.patientsex],
      contato: this.formbuilder.group({
        email: [paciente.contato.email],
        telefone: [paciente.contato.telefone],
        telefone2: [paciente.contato.telefone2],
        celular: [paciente.contato.celular],
      }),
      endereco: this.formbuilder.group({
        logradouro: [paciente.endereco.logradouro],
        complemento: [paciente.endereco.complemento],
        numero: [paciente.endereco.numero],
        bairro: [paciente.endereco.bairro],
        cidade: [paciente.endereco.cidade],
        estado: [paciente.endereco.estado],
        cep: [paciente.endereco.cep]
      })
    });

  }

  CarregarPaciente(idpatient: number) {
    this.service.BuscarPorId(idpatient).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarPaciente();
    } else {
      this.formulario.patchValue(this.AdicionarPaciente());
    }
    this.CriarFormulario(new Patient());
  }

  AdicionarPaciente() {
    return this.service.Adicionar(this.formulario.value)
      .then(response => {
        this.route.navigate(['/paciente']);
      });
  }

  AtualizarPaciente() {
    this.service.Atualizar(this.formulario.value)
      .then(patient => {
        this.formulario.patchValue(patient);
        this.route.navigate(['/paciente']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
