import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaMaquinasComponent } from './lista-maquinas/lista-maquinas.component';
import { CadastroMaquinasComponent } from './cadastro-maquinas/cadastro-maquinas.component';



@NgModule({
  declarations: [ListaMaquinasComponent, CadastroMaquinasComponent],
  imports: [
    CommonModule
  ]
})
export class ComunicacaoModule { }
