import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Produto } from 'src/app/produto/shared/model/produto.model';
import { Pedido } from '../shared/model/pedido.model';
import { PedidoService } from '../shared/service/pedido.service';

@Component({
  selector: 'app-pedido-bebida',
  templateUrl: './pedido-bebida.component.html',
  styleUrls: ['./pedido-bebida.component.css']
})
export class PedidoBebidaComponent implements OnInit {

  @Input() public pedidoSelecionado: Pedido = new Pedido();
  @Input() public exibirBotaoExcluirBebida: boolean = false;
  @Output() public eventoBebidaExcluida: EventEmitter<boolean> = new EventEmitter();

  public bebidaSelecionada: Produto = new Produto();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogExclusaoBebida: boolean = false;
  public processandoExclusaoBebida: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'ID', field: 'id', ordenavel: true, style: 'col-id' },
      { header: 'Descrição', field: 'descricao', ordenavel: true, style: 'col-descricao' },
      { header: 'Preço R$', field: 'preco', ordenavel: false, style: 'col-preco' },
      { header: 'Ações', style: 'col-acoes' }
    ];
  }

  public armazenarBebidaParaExclusao(bebida: Produto): void {
    this.bebidaSelecionada = bebida;
    this.abrirDialogExclusaoBebida = true;
  }

  public fecharDialogExclusaoBebida(): void {
    this.abrirDialogExclusaoBebida = false;
    this.bebidaSelecionada = new Produto();
  }

  public excluirBebida(): void {
    this.processandoExclusaoBebida = true;

    this.pedidoService.excluirBebidaDoPedido(this.pedidoSelecionado.id, this.bebidaSelecionada.id)
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
