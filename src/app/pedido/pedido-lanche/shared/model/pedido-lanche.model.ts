import { Lanche } from "src/app/lanche/shared/model/lanche.model";

export class PedidoLanche {

    id: number;
    precoUnitario: string;
    quantidade: number;
    lanche: Lanche = new Lanche();
}