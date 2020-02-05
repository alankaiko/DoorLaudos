import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {ButtonModule} from 'primeng/components/button/button';
import {PanelMenuModule} from 'primeng/components/panelmenu/panelmenu';
import {MenuItem} from 'primeng/api';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { FormsModule } from '@angular/forms';
import {MenuModule} from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/components/menubar/menubar';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    PanelMenuModule,
    TooltipModule,
    MenuModule,
    BrowserAnimationsModule,
    MenubarModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
