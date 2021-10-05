import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { LancheComponent } from './lanche/lanche.component';
import { RelatorioGraficoComponent } from './relatorio-grafico/relatorio-grafico.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'fornecedores', component: FornecedorComponent },
  { path: '', component: LancheComponent },
  { path: 'relatorios-graficos', component: RelatorioGraficoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
