import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { InformacaoParaPedido } from './shared/model/informacao-para-pedido.model';
import { PedidoBebidaFORM } from './shared/model/pedido-bebida.form';
import { PedidoLancheFORM } from './shared/model/pedido-lanche.form';
import { PedidoFORM } from './shared/model/pedido.form';
import { Pedido } from './shared/model/pedido.model';

import { PedidoService } from './shared/service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  public pedidos: Pedido[] = [];
  public pedidoSelecionado: Pedido = new Pedido();
  public informacaoParaPedido: InformacaoParaPedido = new InformacaoParaPedido();
  public formularioPedido: PedidoFORM = new PedidoFORM();
  public formularioPedidoLanche: PedidoLancheFORM = new PedidoLancheFORM();
  public formularioPedidoBebida: PedidoBebidaFORM = new PedidoBebidaFORM();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesPedido: boolean = false;
  public abrirDialogAdicaoLancheNoPedido: boolean = false;
  public abrirDialogAdicaoBebidaNoPedido: boolean = false;
  public abrirDialogExclusaoPedido: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoOperacaoInformacaoParaPedido: boolean = false;
  public processandoCadastroPedido: boolean = false;
  public processandoAdicaoLanchePedido: boolean = false;
  public processandoAdicaoBebidaPedido: boolean = false;
  public processandoExclusaoPedido: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.buscarPedidos();
    this.buscarInformacaoParaPedido();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'ID', field: 'id', ordenavel: true, style: 'col-id' },
      { header: 'P/ Entrega', field: 'entrega', ordenavel: true, style: 'col-entrega' },
      { header: 'Data & Hora do Pedido', field: 'dataHoraPedido', ordenavel: false, style: 'col-data-hora-pedido' },
      { header: 'Preço Total R$', field: 'precoTotal', ordenavel: false, style: 'col-preco-total' },
      { header: 'Ações', style: 'col-acoes' }
    ];
  }

  private buscarPedidos(): void {
    this.processandoOperacaoListagem = true;

    this.pedidoService.buscarPedidos()
      .subscribe((pedidos: Pedido[]) => {
        this.pedidos = pedidos;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao buscar pedidos!');
      });
  }

  private buscarInformacaoParaPedido(): void {
    this.processandoOperacaoInformacaoParaPedido = true;

    this.pedidoService.buscarInformacaoParaPedido()
      .subscribe((informacaoParaPedido: InformacaoParaPedido) => {

        this.processandoOperacaoInformacaoParaPedido = false;
      },
      () => {
        this.processandoOperacaoInformacaoParaPedido = false;
        this.toastrService.error('Erro ao buscar informação para pedido!');
      });
  } 

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastroPedido(): void {
    this.abrirDialogCadastro = false;
    this.formularioPedido = new PedidoFORM();
  }

  public desabilitarBotaoCadastroPedido(): boolean {
    return;
  }

  public cadastrarPedido(): void {

  }

  public armazenarPedidoParaVisualizarInformacoes(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
    this.abrirDialogInformacoesPedido = true;
  }
}
