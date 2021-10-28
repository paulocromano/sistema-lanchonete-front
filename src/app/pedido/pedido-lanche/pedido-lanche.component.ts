import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Pedido } from '../shared/model/pedido.model';
import { PedidoLanche } from './shared/model/pedido-lanche.model';

import { PedidoLancheService } from './shared/service/pedido-lanche.service';

@Component({
  selector: 'app-pedido-lanche',
  templateUrl: './pedido-lanche.component.html',
  styleUrls: ['./pedido-lanche.component.css']
})
export class PedidoLancheComponent implements OnInit {

  @Input() public pedidoSelecionado: Pedido = new Pedido();
  @Input() public exibirBotaoExcluirLanche: boolean = false;
  @Output() public eventoLancheExcluido: EventEmitter<boolean> = new EventEmitter();

  public lancheSelecionado: PedidoLanche = new PedidoLanche();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogExclusaoLanche: boolean = false;
  public processandoExclusaoLanche: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private pedidoLancheService: PedidoLancheService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'ID', field: 'id', ordenavel: true, style: 'col-id' },
      { header: 'Nome', field: 'lanche', ordenavel: true, style: 'col-lanche' },
      { header: 'Preço Unitário R$', field: 'precoUnitario', ordenavel: false, style: 'col-preco-unitario' },
      { header: 'Quantidade', field: 'quantidade', ordenavel: true, style: 'col-quantidade' },
      { header: 'Ações', style: 'col-acoes' }
    ];
  }

  public armazenarLancheParaExclusao(lanche: PedidoLanche): void {
    this.lancheSelecionado = lanche;
    this.abrirDialogExclusaoLanche = true;
  }

  public fecharDialogExclusaoLanche(): void {
    this.abrirDialogExclusaoLanche = false;
    this.lancheSelecionado = new PedidoLanche();
  }

  public excluirLanche(): void {
    this.processandoExclusaoLanche = true;

    this.pedidoLancheService.excluirLancheDoPedido(this.pedidoSelecionado.id, this.lancheSelecionado.id)
      .subscribe(() => {
        this.processandoExclusaoLanche = false;
        this.toastrService.success('Lanche excluído com sucesso do Pedido!');
        this.fecharDialogExclusaoLanche();
        this.eventoLancheExcluido.emit(true);
      },
      () => {
        this.processandoExclusaoLanche = false;
        this.toastrService.error('Erro ao excluir Lanche do Pedido!');
      });
  }
}
