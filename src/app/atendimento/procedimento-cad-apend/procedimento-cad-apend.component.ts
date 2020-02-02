import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-procedimento-cad-apend',
  templateUrl: './procedimento-cad-apend.component.html',
  styleUrls: ['./procedimento-cad-apend.component.css']
})
export class ProcedimentoCadApendComponent implements OnInit {
  @Input() procedimentos: Array<ProcedimentoAtendimento>;
  procedimento: ProcedimentoAtendimento;
  exbindoFormularioProcedimento = false;
  procedimentoIndex: number;
  profissionalexecutantes: [];
  procedimentomedicos: [];

  constructor(private serviceProc: ProcedimentomedicoService, private serviceProf: ProfissionalexecutanteService) { }

  ngOnInit() {
    this.CarregarProcedimentosMedico();
    this.CarregaProfissionalExecutante();
  }

  PrepararNovoProcedimento() {
    this.exbindoFormularioProcedimento = true;
    this.procedimento = new ProcedimentoAtendimento();
    this.procedimentoIndex = this.procedimentos.length;
  }

  PrepararEdicaoProcedimento(procedimento: ProcedimentoAtendimento, index: number) {
    this.procedimento = this.ClonarProcedimento(procedimento);
    this.exbindoFormularioProcedimento = true;
    this.procedimentoIndex = index;
  }

  ConfirmarProcedimento(frm: FormControl) {
    this.procedimentos[this.procedimentoIndex] = this.ClonarProcedimento(this.procedimento);
    this.exbindoFormularioProcedimento = false;
   // frm.reset();
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

  get editando() {
    return this.procedimento && this.procedimento.codigo;
  }
}
