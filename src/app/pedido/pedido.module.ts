import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { PedidoComponent } from './pedido.component';
import { PedidoLancheComponent } from './pedido-lanche/pedido-lanche.component';
import { PedidoBebidaComponent } from './pedido-bebida/pedido-bebida.component';

@NgModule({
  declarations: [ 
    PedidoComponent, 
    PedidoLancheComponent, 
    PedidoBebidaComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ProgressSpinnerModule,
    DialogModule,
    TooltipModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextareaModule
  ]
})
export class PedidoModule { }
