import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { MesaComponent } from './mesa.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [ MesaComponent ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    InputNumberModule,
    RadioButtonModule,
    DashboardModule
  ]
})
export class MesaModule { }
