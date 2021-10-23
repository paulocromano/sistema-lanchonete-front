import { Fornecedor } from '../../../fornecedor/shared/model/fornecedor.model';

export class Produto {

    id: number;
    descricao: string;
    preco: string;
    tipoProduto: string;
    quantidade: string;
    quantidadeMinimaEstoque: string;
    descricaoEstoque: string;
    dataCadastro: string;
    dataUltimaAtualizacao: string;
    fornecedor: Fornecedor = new Fornecedor();
}