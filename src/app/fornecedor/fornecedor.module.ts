import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { IConfig, NgxMaskModule } from 'ngx-mask';

import { FornecedorComponent } from './fornecedor.component';
import { DashboardModule } from '../dashboard/dashboard.module';

const maskConfig: Partial<IConfig> = { validation: false }

@NgModule({
  declarations: [ FornecedorComponent ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    DashboardModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class FornecedorModule { }
