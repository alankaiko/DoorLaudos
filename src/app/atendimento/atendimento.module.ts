import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaAtendimentoComponent } from './tela-atendimento/tela-atendimento.component';
import { ListaAtendimentoComponent } from './lista-atendimento/lista-atendimento.component';



@NgModule({
  declarations: [TelaAtendimentoComponent, ListaAtendimentoComponent],
  imports: [
    CommonModule
  ]
})
export class AtendimentoModule { }
