import { Endereco } from './endereco.model';

export class Cliente {

    id: number;
    nome: string;
    telefone: string;
    telefoneRecado: string;
    dataCadastro: Date;
    endereco: Endereco = new Endereco();
}