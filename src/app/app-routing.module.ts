import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { DespesaComponent } from './despesa/despesa.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { LancheComponent } from './lanche/lanche.component';
import { LoginComponent } from './login/login.component';
import { MesaComponent } from './mesa/mesa.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ProdutoComponent } from './produto/produto.component';
import { RelatorioGraficoComponent } from './relatorio-grafico/relatorio-grafico.component';
import { AdminGuard } from './shared/guard/admin.guard';
import { LogadoGuard } from './shared/guard/logado.guard';
import { TabelaColaboradoresComponent } from './usuario/tabela-colaboradores/tabela-colaboradores.component';

const routes: Routes = [
  { path: 'inicio', component: PaginaInicialComponent, canActivate: [ LogadoGuard ] },
  { path: 'clientes', component: ClienteComponent, canActivate: [ LogadoGuard ] },
  { path: 'fornecedores', component: FornecedorComponent, canActivate: [ AdminGuard ] },
  { path: 'lanches', component: LancheComponent, canActivate: [ LogadoGuard ] },
  { path: 'relatorios-graficos', component: RelatorioGraficoComponent, canActivate: [ LogadoGuard ] },
  { path: 'despesas', component: DespesaComponent, canActivate: [ AdminGuard ] },
  { path: 'mesas', component: MesaComponent, canActivate: [ LogadoGuard ] },
  { path: 'produtos', component: ProdutoComponent, canActivate: [ LogadoGuard ] },
  { path: 'pedidos', component: PedidoComponent, canActivate: [ LogadoGuard ] },
  { path: 'colaboradores', component: TabelaColaboradoresComponent, canActivate: [ AdminGuard ] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
