import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';

import { RelatorioClienteService } from '../cliente/shared/service/relatorio-cliente.service';
import { RelatorioFornecedorService } from '../fornecedor/shared/service/relatorio-fornecedor.service';
import { RelatorioDespesaService } from '../despesa/shared/service/relatorio-despesa.service';
import { RelatorioProdutoService } from '../produto/shared/service/relatorio-produto.service';
import { RelatorioPedidoService } from '../pedido/shared/service/relatorio-pedido.service';
import { DownloadRelatorioService } from './shared/service/download-relatorio.service';
import { TipoRelatorio } from './shared/model/tipo-relatorio.enum';
import { HttpErrorResponse } from '@angular/common/http';

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
    private relatorioFornecedorService: RelatorioFornecedorService,
    private relatorioDespesaService: RelatorioDespesaService,
    private relatorioProdutoService: RelatorioProdutoService,
    private relatorioPedidoService: RelatorioPedidoService,
    private downloadRelatorioService: DownloadRelatorioService
  ) { }

  ngOnInit(): void {
    this.definirOpcoesRelatorioDropdown();
    this.gerarFormatoCalendario();
  } 

  private definirOpcoesRelatorioDropdown(): void {
    this.opcoesRelatorioDropdown.push(
      { label: 'Todos os Clientes', value: TipoRelatorio.TODOS_CLIENTES },
      { label: 'Clientes por Período', value: TipoRelatorio.CLIENTES_POR_PERIODO },
      { label: 'Todos os Fornecedores', value: TipoRelatorio.TODOS_FORNECEDORES },
      { label: 'Todas as Despesas', value: TipoRelatorio.TODAS_DESPESAS },
      { label: 'Despesas Pagas', value: TipoRelatorio.DESPESAS_PAGAS },
      { label: 'Despesas Vencidas', value: TipoRelatorio.DESPESAS_VENCIDAS },
      { label: 'Todos os Produtos', value: TipoRelatorio.TODOS_PRODUTOS },
      { label: 'Produtos com Estoque Baixo', value: TipoRelatorio.PRODUTOS_ESTOQUE_BAIXO },
      { label: 'Todos os Pedidos', value: TipoRelatorio.TODOS_PEDIDOS }
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
      case TipoRelatorio.TODOS_FORNECEDORES: { this.gerarRelatorioComTodosFornecedores(); break; }
      case TipoRelatorio.TODAS_DESPESAS: { this.gerarRelatorioTodasDespesas(); break; }
      case TipoRelatorio.DESPESAS_PAGAS: { this.gerarRelatorioDespesasPagas(); break; }
      case TipoRelatorio.DESPESAS_VENCIDAS: { this.gerarRelatorioDespesasVencidas(); break; }
      case TipoRelatorio.TODOS_PRODUTOS: { this.gerarRelatorioComTodosProdutos(); break; }
      case TipoRelatorio.PRODUTOS_ESTOQUE_BAIXO: { this.gerarRelatorioComProdutosAbaixoDoEstoqueMinimo(); break; }
      case TipoRelatorio.TODOS_PEDIDOS: { this.gerarRelatorioComTodosPedidos(); break; }
    }
  }

  private gerarRelatorioComTodosClientes(): void {
    this.processandoRelatorio = true;

    this.relatorioClienteService.gerarRelatorioComTodosClientes()
      .subscribe((response) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'clientes.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhum cliente encontrado!');
        else this.toastrService.error('Erro ao gerar relatório de todos os clientes!');
      });
  }

  private gerarRelatorioDeClientesCadastradosEntrePeriodos(): void {
    this.processandoRelatorio = true;

    this.relatorioClienteService.gerarRelatorioDeClientesCadastradosEntrePeriodos(this.dataInicial, this.dataFinal)
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'clientes.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhum cliente encontrado no período especificado!');
        else this.toastrService.error('Erro ao gerar relatório de clientes cadastrados entre período!');
      });
  }

  private gerarRelatorioComTodosFornecedores(): void {
    this.processandoRelatorio = true;

    this.relatorioFornecedorService.gerarRelatorioComTodosFornecedores()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'fornecedores.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhum fornecedor encontrado!');
        else this.toastrService.error('Erro ao gerar relatório de todos os fornecedores!');
      });
  }

  private gerarRelatorioTodasDespesas(): void {
    this.processandoRelatorio = true;

    this.relatorioDespesaService.gerarRelatorioTodasDespesas()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'despesas.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhuma despesa encontrada!');
        else this.toastrService.error('Erro ao gerar relatório de todas as despesas!');
      });
  }

  private gerarRelatorioDespesasPagas(): void {
    this.processandoRelatorio = true;

    this.relatorioDespesaService.gerarRelatorioDespesasPagas()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'despesas pagas.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhuma despesa paga encontrada!');
        else this.toastrService.error('Erro ao gerar relatório das despesas pagas!');
      });
  }

  private gerarRelatorioDespesasVencidas(): void {
    this.processandoRelatorio = true;

    this.relatorioDespesaService.gerarRelatorioDespesasVencidas()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'despesas vencidas.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhuma despesa vencida encontrada!');
        else this.toastrService.error('Erro ao gerar relatório das despesas vencidas!');
      });
  }

  private gerarRelatorioComTodosProdutos(): void {
    this.processandoRelatorio = true;

    this.relatorioProdutoService.gerarRelatorioComTodosProdutos()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'produtos.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhuma produto encontrado!');
        else this.toastrService.error('Erro ao gerar relatório dos produtos!');
      });
  }

  private gerarRelatorioComProdutosAbaixoDoEstoqueMinimo(): void {
    this.processandoRelatorio = true;

    this.relatorioProdutoService.gerarRelatorioComProdutosAbaixoDoEstoqueMinimo()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'produtos.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhuma produto abaixo do estoque mínimo encontrado!');
        else this.toastrService.error('Erro ao gerar relatório dos produtos abaixo do estoque mínimo!');
      });
  }

  private gerarRelatorioComTodosPedidos(): void {
    this.processandoRelatorio = true;

    this.relatorioPedidoService.gerarRelatorioComTodosPedidos()
      .subscribe((response: any) => {
        this.processandoRelatorio = false;
        this.downloadRelatorioService.baixarRelatorio(response, 'pedidos.pdf');
      },
      (erro: HttpErrorResponse) => {
        this.processandoRelatorio = false;
        if (erro.status === 404) this.toastrService.warning('Nenhuma pedido encontrado!');
        else this.toastrService.error('Erro ao gerar relatório dos pedidos!');
      });
  }
}
