import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';

import { RelatorioClienteService } from '../cliente/shared/service/relatorio-cliente.service';
import { DownloadRelatorioService } from './shared/service/download-relatorio.service';
import { TipoRelatorio } from './shared/model/tipo-relatorio.enum';

@Component({
  selector: 'app-relatorio-grafico',
  templateUrl: './relatorio-grafico.component.html',
  styleUrls: ['./relatorio-grafico.component.css']
})
export class RelatorioGraficoComponent implements OnInit {

  public dataInicial: string;
  public dataFinal: string;
  public relatorioPorPeriodo: boolean = false;
  
  public opcoesRelatorioDropdown: SelectItem[] = [];
  public tipoRelatorioSelecionado: TipoRelatorio = null;
  public formatoCalendario: any = {};
  public processandoRelatorio: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private relatorioClienteService: RelatorioClienteService,
    private downloadRelatorioService: DownloadRelatorioService
  ) { }

  ngOnInit(): void {
    this.definirOpcoesRelatorioDropdown();
    this.gerarFormatoCalendario();
  } 

  private definirOpcoesRelatorioDropdown(): void {
    this.opcoesRelatorioDropdown.push(
      { label: 'Todos os Clientes', value: TipoRelatorio.TODOS_CLIENTES },
      { label: 'Clientes por Período', value: TipoRelatorio.CLIENTES_POR_PERIODO }
      );
  }

  private gerarFormatoCalendario(): void {
    this.formatoCalendario = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'mm/dd/yy'
    };
  }

  public desabilitarBotaoParaGerarRelatorio(): boolean {
    const botaoDesabilitado: boolean = this.processandoRelatorio || this.tipoRelatorioSelecionado === null;
    
    if (this.relatorioPorPeriodo) {
      return botaoDesabilitado || !(this.dataInicial && this.dataFinal) || this.dataInicial > this.dataFinal;
    }
    
    return botaoDesabilitado;
  }

  public eventoRelatorioSelecionado(tipoRelatorio: TipoRelatorio): void {
    switch(tipoRelatorio) {
      case TipoRelatorio.CLIENTES_POR_PERIODO: { this.relatorioPorPeriodo = true; break; }
      default: { this.relatorioPorPeriodo = false; break; }
    }
  }

  public gerarRelatorio(): void {
    switch(this.tipoRelatorioSelecionado) {
      case TipoRelatorio.TODOS_CLIENTES: { this.gerarRelatorioComTodosClientes(); break; }
      case TipoRelatorio.CLIENTES_POR_PERIODO: { this.gerarRelatorioDeClientesCadastradosEntrePeriodos(); break; }
    }
  }

  public gerarRelatorioComTodosClientes(): void {
    this.processandoRelatorio = true;

    this.relatorioClienteService.gerarRelatorioComTodosClientes()
      .subscribe((response) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'clientes.pdf');
      },
      (e) => {
        this.processandoRelatorio = false;
        this.toastrService.error('Erro ao gerar relatório de todos os clientes!');
      });
  }

  public gerarRelatorioDeClientesCadastradosEntrePeriodos(): void {
    this.processandoRelatorio = true;
console.log(this.dataInicial)
    this.relatorioClienteService.gerarRelatorioDeClientesCadastradosEntrePeriodos(this.dataInicial, this.dataFinal)
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'clientes.pdf');
      },
      () => {
        this.processandoRelatorio = false;
        this.toastrService.error('Erro ao gerar relatório de clientes cadastrados entre período!');
      });
  }
}
