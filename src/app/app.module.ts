import { CardAtendimentoComponent } from './atendimento/card-atendimento/card-atendimento.component';
import { CardModule } from 'primeng/components/card/card';
import { CardConvenioComponent } from './convenios/card-convenio/card-convenio.component';
import { HttpClientModule } from '@angular/common/http';
import { TelaLaudoComponent } from './laudo/tela-laudo/tela-laudo.component';
import { LaudoModule } from './laudo/laudo.module';
import { ProcedimentoCadApendComponent } from './atendimento/procedimento-cad-apend/procedimento-cad-apend.component';
import { TelaAtendimentoComponent } from './atendimento/tela-atendimento/tela-atendimento.component';
import { ListaAtendimentoComponent } from './atendimento/lista-atendimento/lista-atendimento.component';
import { ListaPacienteComponent } from './pacientes/lista-paciente/lista-paciente.component';
import { CadastroPacienteComponent } from './pacientes/cadastro-paciente/cadastro-paciente.component';
import { ListaTextopessoalComponent } from './textopessoal/lista-textopessoal/lista-textopessoal.component';
import { NgModule } from '@angular/core';
import { ViewerComponent } from './servidor/viewer/viewer.component';
import { PrevisualizacaoComponent } from './servidor/previsualizacao/previsualizacao.component';
import { ListaServidorComponent } from './servidor/lista-servidor/lista-servidor.component';
import { ListaEspecialidademedicaComponent } from './basededados/lista-especialidademedica/lista-especialidademedica.component';
import { ListaCrmComponent } from './basededados/lista-crm/lista-crm.component';
import { ListaCnesComponent } from './basededados/lista-cnes/lista-cnes.component';
import { ListaCid10Component } from './basededados/lista-cid10/lista-cid10.component';
import { ListaCbhpmComponent } from './basededados/lista-cbhpm/lista-cbhpm.component';
import { CadastroTextopessoalComponent } from './textopessoal/cadastro-textopessoal/cadastro-textopessoal.component';
import { ListaProfissionalsolicitanteComponent } from './profissionalsolicitante/lista-profissionalsolicitante/lista-profissionalsolicitante.component';
import { CadastroProfissionalsolComponent } from './profissionalsolicitante/cadastro-profissionalsol/cadastro-profissionalsol.component';
import { CadastroProfissionalexecComponent } from './profissionalexecutante/cadastro-profissionalexec/cadastro-profissionalexec.component';
import { ListaProcedimentomedicoComponent } from './procedimentomedico/lista-procedimentomedico/lista-procedimentomedico.component';
import { CadastroProcedimentomedicoComponent } from './procedimentomedico/cadastro-procedimentomedico/cadastro-procedimentomedico.component';
import { ListaGrupoprocedimentoComponent } from './grupoprocedimento/lista-grupoprocedimento/lista-grupoprocedimento.component';
import { CadastroGrupoprocedimentoComponent } from './grupoprocedimento/cadastro-grupoprocedimento/cadastro-grupoprocedimento.component';
import { ListaConvenioComponent } from './convenios/lista-convenio/lista-convenio.component';
import { CadastroConvenioComponent } from './convenios/cadastro-convenio/cadastro-convenio.component';
import { ListaAbreviaturasComponent } from './abreviaturas/lista-abreviaturas/lista-abreviaturas.component';
import { CadastroAbreviaturaComponent } from './abreviaturas/cadastro-abreviatura/cadastro-abreviatura.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServidorModule } from './servidor/servidor.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import {TableModule} from 'primeng/components/table/table';
import { ListaProfissionalexecutanteComponent } from './profissionalexecutante/lista-profissionalexecutante/lista-profissionalexecutante.component';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import { PanelModule } from 'primeng/components/panel/panel';
import { DialogModule } from 'primeng/components/dialog/dialog';
import {EditorModule} from 'primeng/components/editor/editor';
import { CapturaComponent } from './captura/captura.component';
import {WebcamModule} from 'ngx-webcam';
import {DataViewModule} from 'primeng/components/dataview/dataview';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RatingModule} from 'primeng/rating';
import {ToolbarModule} from 'primeng/toolbar';

const rotas: Routes = [
  { path: 'abreviaturas/novo', component: CadastroAbreviaturaComponent },
  { path: 'abreviaturas/:cod', component: CadastroAbreviaturaComponent },
  { path: 'abreviaturas', component: ListaAbreviaturasComponent },
  { path: 'abreviaturas/:cod', component: CadastroAbreviaturaComponent },
  { path: 'convenios/novo', component: CadastroConvenioComponent },
  { path: 'convenios/:cod', component: CadastroConvenioComponent },
  { path: 'convenios', component: ListaConvenioComponent },
  { path: 'grupoprocedimento/novo', component: CadastroGrupoprocedimentoComponent },
  { path: 'grupoprocedimento/:cod', component: CadastroGrupoprocedimentoComponent },
  { path: 'grupoprocedimento', component: ListaGrupoprocedimentoComponent },
  { path: 'procedimentomedico/novo', component: CadastroProcedimentomedicoComponent },
  { path: 'procedimentomedico/:cod', component: CadastroProcedimentomedicoComponent },
  { path: 'procedimentomedico', component: ListaProcedimentomedicoComponent },
  { path: 'profissionalexecutante/novo', component: CadastroProfissionalexecComponent },
  { path: 'profissionalexecutante/:cod', component: CadastroProfissionalexecComponent },
  { path: 'profissionalexecutante', component: ListaProfissionalexecutanteComponent },
  { path: 'profissionalsolicitante/novo', component: CadastroProfissionalsolComponent },
  { path: 'profissionalsolicitante/:cod', component: CadastroProfissionalsolComponent },
  { path: 'profissionalsolicitante', component: ListaProfissionalsolicitanteComponent },
  { path: 'textopessoal/novo', component: CadastroTextopessoalComponent },
  { path: 'textopessoal/:cod', component: CadastroTextopessoalComponent },
  { path: 'textopessoal', component: ListaTextopessoalComponent },
  { path: 'listacbhpm', component: ListaCbhpmComponent },
  { path: 'listacid', component: ListaCid10Component },
  { path: 'listacnes', component: ListaCnesComponent },
  { path: 'listacrm', component: ListaCrmComponent },
  { path: 'listaespecialidades', component: ListaEspecialidademedicaComponent },
  { path: 'servidor', component: ListaServidorComponent },
  { path: 'previsualizar/:idpatient', component: PrevisualizacaoComponent },
  { path: 'viewer/:cod', component: ViewerComponent },
  { path: 'paciente', component: ListaPacienteComponent },
  { path: 'paciente/novo', component: CadastroPacienteComponent },
  { path: 'paciente/:cod', component: CadastroPacienteComponent },
  { path: 'atendimento', component: ListaAtendimentoComponent },
  { path: 'atendimento/novo', component: TelaAtendimentoComponent },
  { path: 'atendimento/:cod', component: TelaAtendimentoComponent },
  { path: 'laudos', component: TelaLaudoComponent },
  { path: 'captura', component: CapturaComponent }
];

@NgModule({
  declarations: [
    AppComponent, CadastroAbreviaturaComponent, ListaAbreviaturasComponent,
    CadastroConvenioComponent, ListaConvenioComponent, CadastroGrupoprocedimentoComponent,
    ListaGrupoprocedimentoComponent, CadastroProcedimentomedicoComponent,
    ListaProcedimentomedicoComponent, CadastroProfissionalexecComponent,
    ListaProfissionalexecutanteComponent, CadastroProfissionalsolComponent,
    ListaProfissionalsolicitanteComponent, CadastroTextopessoalComponent,
    ListaTextopessoalComponent, ListaCbhpmComponent, ListaCid10Component,
    ListaCnesComponent, ListaCrmComponent, ListaEspecialidademedicaComponent,
    ListaPacienteComponent, CadastroPacienteComponent, ListaAtendimentoComponent,
    TelaAtendimentoComponent, ProcedimentoCadApendComponent, CapturaComponent, CardConvenioComponent, CardAtendimentoComponent
  ],
  imports: [
    ServidorModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    CoreModule,
    FormsModule,
    CheckboxModule,
    RouterModule.forRoot(rotas),
    InputMaskModule,
    FieldsetModule,
    DropdownModule,
    CalendarModule,
    PanelModule,
    DialogModule,
    LaudoModule,
    EditorModule,
    HttpClientModule,
    WebcamModule,
    DataViewModule,
    CardModule,
    ToggleButtonModule,
    RatingModule,
    ToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
