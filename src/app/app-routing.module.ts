import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { DespesaComponent } from './despesa/despesa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { LancheComponent } from './lanche/lanche.component';
import { MesaComponent } from './mesa/mesa.component';
import { ProdutoComponent } from './produto/produto.component';
import { RelatorioGraficoComponent } from './relatorio-grafico/relatorio-grafico.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'fornecedores', component: FornecedorComponent },
  { path: 'lanches', component: LancheComponent },
  { path: 'relatorios-graficos', component: RelatorioGraficoComponent },
  { path: 'despesas', component: DespesaComponent },
  { path: 'mesas', component: MesaComponent },
  { path: 'produtos', component: ProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
