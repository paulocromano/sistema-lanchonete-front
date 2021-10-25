import { Mesa } from '../../../mesa/shared/model/mesa.model';
import { Cliente } from '../../../cliente/shared/model/cliente.model';
import { Lanche } from '../../../lanche/shared/model/lanche.model';
import { Produto } from '../../../produto/shared/model/produto.model';

export class Pedido {

    id: number;
    observacoes: string;
    entrega: string;
    dataHoraPedido: string;
    dataHoraEntrega: string;
    precoTotal: string;
    mesa: Mesa = new Mesa();
    cliente: Cliente = new Cliente();
    lanches: Lanche[] = [];
    bebidas: Produto[] = [];
}