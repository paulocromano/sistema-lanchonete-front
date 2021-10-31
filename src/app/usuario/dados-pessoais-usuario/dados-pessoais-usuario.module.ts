import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TabViewModule } from 'primeng/tabview';

import { DadosPessoaisUsuarioComponent } from './dados-pessoais-usuario.component';

@NgModule({
  declarations: [ DadosPessoaisUsuarioComponent ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DialogModule,
    PasswordModule,
    ProgressSpinnerModule,
    TabViewModule
  ],
  exports: [ DadosPessoaisUsuarioComponent ]
})

export class DadosPessoaisUsuarioModule { }
