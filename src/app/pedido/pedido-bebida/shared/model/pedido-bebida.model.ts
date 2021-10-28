import { Produto } from '../../../../produto/shared/model/produto.model';
 
export class PedidoBebida {

    id: number;
    precoUnitario: string;
    quantidade: number;
    bebida: Produto = new Produto();
}