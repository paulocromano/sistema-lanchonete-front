import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

import { IConfig, NgxMaskModule } from 'ngx-mask';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { ClienteModule } from './cliente/cliente.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { RelatorioGraficoModule } from './relatorio-grafico/relatorio-grafico.module';
import { LancheModule } from './lanche/lanche.module';
import { DespesaModule } from './despesa/despesa.module';
import { MesaModule } from './mesa/mesa.module';
import { ProdutoModule } from './produto/produto.module';
import { PedidoModule } from './pedido/pedido.module';
import { PaginaInicialModule } from './pagina-inicial/pagina-inicial.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DadosPessoaisUsuarioModule } from './usuario/dados-pessoais-usuario/dados-pessoais-usuario.module';
import { TabelaColaboradoresModule } from './usuario/tabela-colaboradores/tabela-colaboradores.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { LoginModule } from './login/login.module';
import { LogadoGuard } from './shared/guard/logado.guard';
import { AdminGuard } from './shared/guard/admin.guard';

const maskConfig: Partial<IConfig> = { validation: false }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PaginaInicialModule,
    HttpClientModule,
    AppRoutingModule,
    ClienteModule,
    FornecedorModule,
    LancheModule,
    RelatorioGraficoModule,
    DespesaModule,
    MesaModule,
    ProdutoModule,
    PedidoModule,
    DashboardModule,
    DadosPessoaisUsuarioModule,
    TabelaColaboradoresModule,
    LoginModule,
    InterceptorModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,

    }),
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    LogadoGuard,
    AdminGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
