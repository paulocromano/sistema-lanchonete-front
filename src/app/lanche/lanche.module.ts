import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IConfig, NgxMaskModule } from 'ngx-mask';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

import { LancheComponent } from './lanche.component';
import { DashboardModule } from '../dashboard/dashboard.module';

const maskConfig: Partial<IConfig> = { validation: false }

@NgModule({
  declarations: [ LancheComponent ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    InputTextareaModule,
    InputNumberModule,
    DashboardModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class LancheModule { }
