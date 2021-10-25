import { Cliente } from "../../../cliente/shared/model/cliente.model";
import { Lanche } from "../../../lanche/shared/model/lanche.model";
import { Mesa } from "../../../mesa/shared/model/mesa.model";
import { Produto } from "../../../produto/shared/model/produto.model";

export class InformacaoParaPedido {

    mesas: Mesa[] = [];
    clientes: Cliente[] = [];
    lanches: Lanche[] = [];
    bebidas: Produto[] = [];
}