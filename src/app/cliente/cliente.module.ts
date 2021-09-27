import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';

import { IConfig, NgxMaskModule } from 'ngx-mask';

import { ClienteComponent } from './cliente.component';

const maskConfig: Partial<IConfig> = { validation: false }

@NgModule({
  declarations: [ ClienteComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class ClienteModule { }
