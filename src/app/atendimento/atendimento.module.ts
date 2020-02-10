import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaAtendimentoComponent } from './tela-atendimento/tela-atendimento.component';
import { ListaAtendimentoComponent } from './lista-atendimento/lista-atendimento.component';
import { ProcedimentoCadApendComponent } from './procedimento-cad-apend/procedimento-cad-apend.component';
import { CardAtendimentoComponent } from './card-atendimento/card-atendimento.component';


@NgModule({
  declarations: [TelaAtendimentoComponent, ListaAtendimentoComponent, ProcedimentoCadApendComponent, CardAtendimentoComponent],
  imports: [
    CommonModule
  ]
})
export class AtendimentoModule { }
