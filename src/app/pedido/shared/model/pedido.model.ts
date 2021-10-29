import { Mesa } from '../../../mesa/shared/model/mesa.model';
import { Cliente } from '../../../cliente/shared/model/cliente.model';
import { PedidoLanche } from '../../pedido-lanche/shared/model/pedido-lanche.model';
import { PedidoBebida } from '../../pedido-bebida/shared/model/pedido-bebida.model';

export class Pedido {

    id: number;
    observacoes: string;
    entrega: string;
    dataHoraPedido: string;
    dataHoraEntrega: string;
    precoTotal: string;
    pedidoFinalizado: string;
    mesa: Mesa = new Mesa();
    cliente: Cliente = new Cliente();
    lanches: PedidoLanche[] = [];
    bebidas: PedidoBebida[] = [];
}