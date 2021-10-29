import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Pedido } from '../shared/model/pedido.model';
import { PedidoBebida } from './shared/model/pedido-bebida.model';
import { PedidoBebidaService } from './shared/service/pedido-bebida.service';

@Component({
  selector: 'app-pedido-bebida',
  templateUrl: './pedido-bebida.component.html',
  styleUrls: ['./pedido-bebida.component.css']
})
export class PedidoBebidaComponent implements OnInit {

  @Input() public pedidoSelecionado: Pedido = new Pedido();
  @Input() public exibirBotaoExcluirBebida: boolean = false;
  @Output() public eventoBebidaExcluida: EventEmitter<boolean> = new EventEmitter();

  public bebidaSelecionada: PedidoBebida = new PedidoBebida();

  public colunasTabela: any[] = [];
  public inputPesquisa: string;

  public abrirDialogExclusaoBebida: boolean = false;
  public processandoExclusaoBebida: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private pedidoBebidaService: PedidoBebidaService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'ID', field: 'id', ordenavel: true, style: 'col-id' },
      { header: 'Descrição', field: 'bebida', ordenavel: true, style: 'col-bebida' },
      { header: 'Preço Unitário R$', field: 'precoUnitario', ordenavel: false, style: 'col-preco-unitario' },
      { header: 'Quantidade', field: 'quantidade', ordenavel: true, style: 'col-quantidade' }  
    ];

    if (this.exibirBotaoExcluirBebida) {
      this.colunasTabela.push({ header: 'Ações', style: 'col-acoes' });
    }
  }

  public armazenarBebidaParaExclusao(bebida: PedidoBebida): void {
    this.bebidaSelecionada = bebida;
    this.abrirDialogExclusaoBebida = true;
  }

  public fecharDialogExclusaoBebida(): void {
    this.abrirDialogExclusaoBebida = false;
    this.bebidaSelecionada = new PedidoBebida();
  }

  public excluirBebida(): void {
    this.processandoExclusaoBebida = true;

    this.pedidoBebidaService.excluirBebidaDoPedido(this.pedidoSelecionado.id, this.bebidaSelecionada.id)
      .subscribe(() => {
        this.processandoExclusaoBebida = false;
        this.toastrService.success('Bebida excluída com sucesso do Pedido!');
        this.fecharDialogExclusaoBebida();
        this.eventoBebidaExcluida.emit(true);
      },
      () => {
        this.processandoExclusaoBebida = false;
        this.toastrService.error('Erro ao excluir Bebida do Pedido!');
      });
  }
}
