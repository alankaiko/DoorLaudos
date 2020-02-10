import { ListaConvenioComponent } from './lista-convenio/lista-convenio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/components/table/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { CardConvenioComponent } from './card-convenio/card-convenio.component';
import {CardModule} from 'primeng/components/card/card';
import { AppRoutingModule } from './../app-routing.module';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import {DataViewModule} from 'primeng/components/dataview/dataview';
import {PanelModule} from 'primeng/components/panel/panel';
import {LightboxModule} from 'primeng/components/lightbox/lightbox';
import {ToggleButtonModule} from 'primeng/togglebutton';

@NgModule({
  declarations: [],
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
    RouterModule,
    CheckboxModule,
    CommonModule,
    CardModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    DataViewModule,
    PanelModule,
    LightboxModule,
    ToggleButtonModule
  ]
})
export class ConveniosModule { }
