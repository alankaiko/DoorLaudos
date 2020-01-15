import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { ListaPacienteComponent } from './lista-paciente/lista-paciente.component';



@NgModule({
  declarations: [CadastroPacienteComponent, ListaPacienteComponent],
  imports: [
    CommonModule
  ]
})
export class PacientesModule { }
