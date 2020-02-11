import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-procedimento-cad-apend',
  templateUrl: './procedimento-cad-apend.component.html',
  styleUrls: ['./procedimento-cad-apend.component.css']
})
export class ProcedimentoCadApendComponent implements OnInit {
  @Input() procedimentos: Array<ProcedimentoAtendimento>;

  formulario: FormGroup;
  exbindoFormularioProcedimento = false;
  procedimentoIndex: number;
  profissionalexecutantes: [];
  procedimentomedicos: [];
  datadias;

  constructor(private formbuilder: FormBuilder,
              private serviceProc: ProcedimentomedicoService,
              private serviceProf: ProfissionalexecutanteService) { }

  ngOnInit() {
    this.CriarFormulario(new ProcedimentoAtendimento());
    this.CarregarProcedimentosMedico();
    this.CarregaProfissionalExecutante();
    this.AdicionandoDias();
  }

  CriarFormulario(procedimento: ProcedimentoAtendimento) {
    this.formulario = this.formbuilder.group({
      codigo: [null, procedimento.codigo],
      valorpaciente: [null, procedimento.valorpaciente],
      valorconvenio: [null, procedimento.valorconvenio],
      preventregalaudo: [null, procedimento.preventregalaudo],
      dataexecucao: [null, procedimento.dataexecucao],
      profexecutante: this.formbuilder.group({
        codigo: [null, Validators.required]
      }),
      procedimentomedico: this.formbuilder.group({
        codigo: [null, Validators.required]
      })
    });
  }

  PrepararNovoProcedimento() {
    this.exbindoFormularioProcedimento = true;
    this.CriarFormulario(new ProcedimentoAtendimento());
    this.procedimentoIndex = this.procedimentos.length;
  }

  PrepararEdicaoProcedimento(procedimento: ProcedimentoAtendimento) {
    this.formulario.patchValue(procedimento);
    this.exbindoFormularioProcedimento = true;
    // this.procedimento = this.ClonarProcedimento(procedimento);
    // this.CriarFormulario(this.ClonarProcedimento(procedimento));
    // this.service.BuscarPorId(codigo).then(abreviatura => this.formulario.patchValue(abreviatura));
    // this.procedimentoIndex = index;
  }

  ConfirmarProcedimento() {
   // this.procedimentos[this.procedimentoIndex] = this.ClonarProcedimento(this.procedimento);
    this.procedimentos[this.procedimentoIndex] = this.formulario.value;
    this.exbindoFormularioProcedimento = false;

    // this.CriarFormulario(new ProcedimentoAtendimento());
  }

  RemoverProcedimento(index: number) {
    this.procedimentos.splice(index, 1);
  }

  ClonarProcedimento(procedimento: ProcedimentoAtendimento): ProcedimentoAtendimento {
    return new ProcedimentoAtendimento(procedimento.codigo, procedimento.profexecutante,
      procedimento.procedimentomedico, procedimento.valorpaciente,
      procedimento.valorconvenio, procedimento.preventregalaudo,
      procedimento.dataexecucao, procedimento.atendimento);
  }

  CarregarProcedimentosMedico() {
    this.serviceProc.Listar().then(lista => {
      this.procedimentomedicos = lista.map(proc => ({label: proc.nome, value: proc.codigo}));
    }).catch(erro => erro);
  }

  CarregaProfissionalExecutante() {
    this.serviceProf.Listar().then(lista => {
      this.profissionalexecutantes = lista.map(prof => ({label: prof.nome, value: prof.codigo}));
    }).catch(erro => erro);
  }

  AdicionandoDias() {
    const data = moment();
    data.add(8, 'days');
    moment(data, 'YYYY-MM-DD').toDate();
  }
}
