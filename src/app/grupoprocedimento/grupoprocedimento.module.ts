import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroGrupoprocedimentoComponent } from './cadastro-grupoprocedimento/cadastro-grupoprocedimento.component';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/components/table/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaGrupoprocedimentoComponent } from './lista-grupoprocedimento/lista-grupoprocedimento.component';



@NgModule({
  declarations: [CadastroGrupoprocedimentoComponent, ListaGrupoprocedimentoComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule,
    RouterModule
  ]
})
export class GrupoprocedimentoModule { }
