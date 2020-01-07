import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCbhpmComponent } from './lista-cbhpm/lista-cbhpm.component';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/components/table/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaCid10Component } from './lista-cid10/lista-cid10.component';
import { ListaCnesComponent } from './lista-cnes/lista-cnes.component';
import { ListaCrmComponent } from './lista-crm/lista-crm.component';
import { ListaEspecialidademedicaComponent } from './lista-especialidademedica/lista-especialidademedica.component';


@NgModule({
  declarations: [ListaCbhpmComponent, ListaCid10Component, ListaCnesComponent, ListaCrmComponent, ListaEspecialidademedicaComponent],
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
export class BasededadosModule { }
