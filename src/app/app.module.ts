import { ViewerComponent } from './servidor/viewer/viewer.component';
import { PrevisualizacaoComponent } from './servidor/previsualizacao/previsualizacao.component';
import { ListaServidorComponent } from './servidor/lista-servidor/lista-servidor.component';
import { ListaEspecialidademedicaComponent } from './basededados/lista-especialidademedica/lista-especialidademedica.component';
import { ListaCrmComponent } from './basededados/lista-crm/lista-crm.component';
import { ListaCnesComponent } from './basededados/lista-cnes/lista-cnes.component';
import { ListaCid10Component } from './basededados/lista-cid10/lista-cid10.component';
import { ListaCbhpmComponent } from './basededados/lista-cbhpm/lista-cbhpm.component';
import { ListaTextopessoalComponent } from './textopessoal/lista-textopessoal/lista-textopessoal.component';
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
import { NgModule } from '@angular/core';
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

const rotas: Routes = [
  { path: 'abreviaturas/novo', component: CadastroAbreviaturaComponent },
  { path: 'abreviaturas', component: ListaAbreviaturasComponent },
  { path: 'convenios/novo', component: CadastroConvenioComponent },
  { path: 'convenios', component: ListaConvenioComponent },
  { path: 'grupoprocedimento/novo', component: CadastroGrupoprocedimentoComponent },
  { path: 'grupoprocedimento', component: ListaGrupoprocedimentoComponent },
  { path: 'procedimentomedico/novo', component: CadastroProcedimentomedicoComponent },
  { path: 'procedimentomedico', component: ListaProcedimentomedicoComponent },
  { path: 'profissionalexecutante/novo', component: CadastroProfissionalexecComponent },
  { path: 'profissionalexecutante', component: ListaProfissionalexecutanteComponent },
  { path: 'profissionalsolicitante/novo', component: CadastroProfissionalsolComponent },
  { path: 'profissionalsolicitante', component: ListaProfissionalsolicitanteComponent },
  { path: 'textopessoal/novo', component: CadastroTextopessoalComponent },
  { path: 'textopessoal', component: ListaTextopessoalComponent },
  { path: 'listacbhpm', component: ListaCbhpmComponent },
  { path: 'listacid', component: ListaCid10Component },
  { path: 'listacnes', component: ListaCnesComponent },
  { path: 'listacrm', component: ListaCrmComponent },
  { path: 'listaespecialidades', component: ListaEspecialidademedicaComponent },
  { path: 'servidor', component: ListaServidorComponent },
  { path: 'previsualizar/:idpatient', component: PrevisualizacaoComponent },
  { path: 'viewer/:instanceuid', component: ViewerComponent }
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
    ListaCnesComponent, ListaCrmComponent, ListaEspecialidademedicaComponent
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
    RouterModule.forRoot(rotas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
