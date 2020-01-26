import { RouterModule } from '@angular/router';
import { ListaServidorComponent } from './lista-servidor/lista-servidor.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/components/table/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrevisualizacaoComponent } from './previsualizacao/previsualizacao.component';
import { ViewerComponent } from './viewer/viewer.component';
import {TreeTableModule} from 'primeng/components/treetable/treetable';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';


@NgModule({
  declarations: [ListaServidorComponent, PrevisualizacaoComponent, ViewerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    TreeTableModule,
    DialogModule,
    ToolbarModule
  ],
  exports: [
    ListaServidorComponent
  ]
})
export class ServidorModule { }
