import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown'; 
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { ProdutoComponent } from './produto.component';

@NgModule({
  declarations: [ ProdutoComponent ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    InputTextareaModule
  ]
})
export class ProdutoModule { }
