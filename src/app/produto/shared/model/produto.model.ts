import { Fornecedor } from '../../../fornecedor/shared/model/fornecedor.model';

export class Produto {

    id: number;
    descricao: string;
    preco: string;
    tipoProduto: string;
    quantidade: number;
    quantidadeMinimaEstoque: number;
    descricaoEstoque: string;
    dataCadastro: string;
    dataUltimaAtualizacao: string;
    fornecedor: Fornecedor = new Fornecedor();
}