import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';

import { IConfig, NgxMaskModule } from 'ngx-mask';

import { ClienteModule } from './cliente/cliente.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { RelatorioGraficoModule } from './relatorio-grafico/relatorio-grafico.module';
import { LancheModule } from './lanche/lanche.module';
import { DespesaModule } from './despesa/despesa.module';


const maskConfig: Partial<IConfig> = { validation: false }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ClienteModule,
    FornecedorModule,
    LancheModule,
    RelatorioGraficoModule,
    DespesaModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,

    }),
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
