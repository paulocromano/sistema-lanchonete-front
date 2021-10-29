import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { RelatorioGraficoComponent } from './relatorio-grafico.component';

@NgModule({
  declarations: [ RelatorioGraficoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
  ]
})
export class RelatorioGraficoModule { }
