import { TableModule } from 'primeng/components/table/table';
import { ButtonModule } from 'primeng/components/button/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLaudoComponent } from './tela-laudo/tela-laudo.component';
import {EditorModule} from 'primeng/components/editor/editor';


@NgModule({
  declarations: [TelaLaudoComponent],
  imports: [
    CommonModule,
    EditorModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ButtonModule,
    TableModule,
    EditorModule
  ]
})
export class LaudoModule { }
