import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
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
  public mesasDropdown: SelectItem[] = [];
  public clientesDropdown: SelectItem[] = [];
  public lanchesDropdown: SelectItem[] = [];
  public bebidasDropdown: SelectItem[] = [];

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
      { header: 'Cliente', field: 'cliente', ordenavel: true, style: 'col-nome' },
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
        informacaoParaPedido.mesas.forEach(mesa => this.mesasDropdown.push({ label: mesa.numero.toString(), value: mesa.id }));
        informacaoParaPedido.clientes.forEach(cliente => this.clientesDropdown.push({ label: cliente.nome, value: cliente.id }));
        informacaoParaPedido.lanches.forEach(lanche => 
          this.lanchesDropdown.push({ label: `${lanche.nome} - ${lanche.ingredientes}`, value: lanche.id }));
        informacaoParaPedido.bebidas.forEach(bebida => this.bebidasDropdown.push({ label: bebida.descricao, value: bebida.id }));
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
    return this.processandoCadastroPedido || !(this.formularioPedido
      && this.formularioPedido.entrega);
  }

  public cadastrarPedido(): void {
    this.processandoCadastroPedido = true;

    this.pedidoService.cadastrarPedido(this.formularioPedido)
      .subscribe(() => {
        this.processandoCadastroPedido = false;
        this.toastrService.success('Pedido cadastrado com sucesso!');
        this.fecharDialogCadastroPedido();
        this.buscarPedidos();
      },
      () => {
        this.processandoCadastroPedido = false;
        this.toastrService.error('Erro ao cadastrar Pedido!');
      });
  }

  public armazenarPedidoParaVisualizarInformacoes(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
    this.abrirDialogInformacoesPedido = true;
  }

  public fecharDialogInformacoesPedido(): void {
    this.abrirDialogInformacoesPedido = false;
    this.pedidoSelecionado = new Pedido();
  }

  public armazenarPedidoParaAdicionarLanche(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
    this.formularioPedidoLanche.observacoes = pedido.observacoes;
    this.abrirDialogAdicaoLancheNoPedido = true;
  }

  public fecharDialogAdicaoLancheNoPedido(): void {
    this.abrirDialogAdicaoLancheNoPedido = false;
    this.pedidoSelecionado = new Pedido();
    this.formularioPedidoLanche = new PedidoLancheFORM();
  }

  public desabilitarBotaoAdicaoLancheNoPedido(): boolean {
    return this.processandoAdicaoLanchePedido || !(this.formularioPedidoLanche
      && this.formularioPedidoLanche.idLanche && this.formularioPedidoLanche.quantidade);
  }

  public adicionarLancheAoPedido(): void {
    this.processandoAdicaoLanchePedido = true;

    this.pedidoService.adicionarLancheAoPedido(this.pedidoSelecionado.id, this.formularioPedidoLanche)
      .subscribe(() => {
        this.processandoAdicaoLanchePedido = false;
        this.toastrService.success('Lanche adicionado com sucesso no Pedido!');
        this.fecharDialogAdicaoLancheNoPedido();
        this.buscarPedidos();
      },
      () => {
        this.processandoAdicaoLanchePedido = false;
        this.toastrService.error('Erro ao adicionar Lanche no Pedido!');
      });
  }

  public armazenarPedidoParaAdicionarBebida(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
    this.formularioPedidoBebida.observacoes = pedido.observacoes;
    this.abrirDialogAdicaoBebidaNoPedido = true;
  }

  public fecharDialogAdicaoBebidaNoPedido(): void {
    this.abrirDialogAdicaoBebidaNoPedido = false;
    this.pedidoSelecionado = new Pedido();
    this.formularioPedidoBebida = new PedidoBebidaFORM();
  }

  public desabilitarBotaoAdicaoBebidaNoPedido(): boolean {
    return this.processandoAdicaoBebidaPedido || !(this.formularioPedidoBebida
      && this.formularioPedidoBebida.idProduto && this.formularioPedidoBebida.quantidade);
  }

  public adicionarBebidaAoPedido(): void {
    this.processandoAdicaoBebidaPedido = true;

    this.pedidoService.adicionarBebidaAoPedido(this.pedidoSelecionado.id, this.formularioPedidoBebida)
      .subscribe(() => {
        this.processandoAdicaoBebidaPedido = false;
        this.toastrService.success('Bebida adicionada com sucesso no Pedido!');
        this.fecharDialogAdicaoBebidaNoPedido();
        this.buscarPedidos();
      },
      () => {
        this.processandoAdicaoBebidaPedido = false;
        this.toastrService.error('Erro ao adicionar Bebida no Pedido!');
      });
  }

  public armazenarPedidoParaExclusao(pedido: Pedido): void {
    this.pedidoSelecionado = pedido;
    this.abrirDialogExclusaoPedido = true;
  }
  
  public fecharDialogExclusaoPedido(): void {
    this.abrirDialogExclusaoPedido = false;
    this.pedidoSelecionado = new Pedido();
  }

  public excluirPedido(): void {
    this.processandoExclusaoPedido = true;

    this.pedidoService.excluirPedido(this.pedidoSelecionado.id)
      .subscribe(() => {
        this.processandoExclusaoPedido = false;
        this.toastrService.success('Pedido excluído com sucesso!');
        this.fecharDialogExclusaoPedido();
        this.buscarPedidos();
      },
      () => {
        this.processandoExclusaoPedido = false;
        this.toastrService.error('Erro ao excluir o Pedido!');
      });
  }

  public eventoExclusaoBebidaDoPedido(bebidaExcluida: boolean): void {
    if (bebidaExcluida) {
      this.buscarPedidos();
    }
  }
}
