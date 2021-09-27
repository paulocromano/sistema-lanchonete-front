import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { Cliente } from './shared/model/cliente.model';
import { ClienteFORM } from './shared/model/cliente.form';
import { ClienteService } from './shared/service/cliente.service';
import { EnderecoService } from './shared/service/endereco.service';
import { Endereco } from './shared/model/endereco.model';
import { EnderecoFORM } from './shared/model/endereco.form';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: Cliente[] = [];
  public clienteSelecionado: Cliente = new Cliente();
  public formularioCliente: ClienteFORM = new ClienteFORM();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesCliente: boolean = false;
  public abrirDialogEdicaoCliente: boolean = false;
  public abrirDialogExclusaoCliente: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroEdicaoCliente: boolean = false;
  public processandoBuscaCep: boolean = false;
  public processandoExclusaoCliente: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService
    ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.listarClientes();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'Data do Cadastro', field: 'dataCadastro', style: 'col-dataCadastro' },
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
      { header: 'Telefone p/ Recado', field: 'telefoneRecado', style: 'col-telefoneRecado' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  private listarClientes(): void {
    this.processandoOperacaoListagem = true;

    this.clienteService.listarClientes()
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao listar clientes!');
      })
  }

  public formatarDataCadastroCliente(dataCadastro: Date): string {
    if (dataCadastro)  {
      const data: string[] = dataCadastro.toString().split('-');
      return `${data[2]}/${data[1]}/${data[0]}`;
    }
    return '';
  }

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastroEdicaoCliente(): void {
    this.abrirDialogCadastro = false;
    this.abrirDialogEdicaoCliente = false;
    this.clienteSelecionado = new Cliente();
    this.formularioCliente = new ClienteFORM();
  }

  public buscarEnderecoPeloCEP(cep: string): void {
    const regexCep = /^[0-9]{5}-[0-9]{3}$/;

    if (regexCep.test(cep) && !this.processandoBuscaCep) {
      this.processandoBuscaCep = true;
      this.enderecoService.buscarEnderecoPeloCEP(cep.replace('-', ''))
        .subscribe((endereco: Endereco) => {
          this.formularioCliente.endereco = endereco;
          this.processandoBuscaCep = false;
        },
        (error: HttpErrorResponse) => {
          this.processandoBuscaCep = false;

          if (error.status === 404) {
            this.toastrService.warning('CEP não encontrado!');
          }
          else {
            this.toastrService.error('Erro ao consultar o CEP!');
          }
        });
    }
  }

  public desabilitarBotaoCadastroEdicaoCliente(): boolean {
    const endereco: EnderecoFORM = this.formularioCliente.endereco;

    const dadosFormularioEstaoPreenchidos: boolean = 
      this.processandoCadastroEdicaoCliente || !(this.formularioCliente
        && this.formularioCliente.nome && this.formularioCliente.telefone
        && endereco && endereco.logradouro && endereco.numero 
        && endereco.bairro && endereco.cidade && endereco.uf);

    return this.abrirDialogCadastro ? dadosFormularioEstaoPreenchidos 
      : dadosFormularioEstaoPreenchidos || !this.dadosClienteSofreramAlteracoes();
  }

  private dadosClienteSofreramAlteracoes(): boolean {
    const enderecoFormulario: EnderecoFORM = this.formularioCliente.endereco;
    const enderecoClienteSelecionado: Endereco = this.clienteSelecionado.endereco;

    return this.formularioCliente.nome !== this.clienteSelecionado.nome
      || this.formularioCliente.telefone !== this.clienteSelecionado.telefone
      || this.formularioCliente.telefoneRecado !== this.clienteSelecionado.telefoneRecado
      || enderecoFormulario.logradouro !== enderecoClienteSelecionado.logradouro
      || enderecoFormulario.numero !== enderecoClienteSelecionado.numero
      || enderecoFormulario.complemento !== enderecoClienteSelecionado.complemento
      || enderecoFormulario.bairro !== enderecoClienteSelecionado.bairro
      || enderecoFormulario.cidade !== enderecoClienteSelecionado.cidade
      || enderecoFormulario.uf !== enderecoClienteSelecionado.uf
      || enderecoFormulario.cep !== enderecoClienteSelecionado.cep;
  }

  public cadastrarEditarCliente(): void {
    if (this.abrirDialogCadastro) {
      this.cadastrarCliente();
    }
    else if (this.abrirDialogEdicaoCliente) {
      this.alterarDadosCliente();
    }
  }

  public cadastrarCliente(): void {
    this.processandoCadastroEdicaoCliente = true;

    this.clienteService.cadastrarCliente(this.formularioCliente)
      .subscribe(() => {
        this.processandoCadastroEdicaoCliente = false;
        this.toastrService.success('Cliente cadastrado(a) com sucesso!');
        this.fecharDialogCadastroEdicaoCliente();
        this.listarClientes();
      },
      (error: HttpErrorResponse) => {
        this.processandoCadastroEdicaoCliente = false;

        if (error.status === 422) {
          this.toastrService.error('Existe(m) campo(s) inválido(s)!');
        }
        else {
          this.toastrService.error('Erro ao cadastrar cliente!');
        }
      })
  }

  public alterarDadosCliente(): void {
    this.processandoCadastroEdicaoCliente = true;

    this.clienteService.alterarDadosCliente(this.clienteSelecionado.id, this.formularioCliente)
      .subscribe(() => {
        this.processandoCadastroEdicaoCliente = false;
        this.toastrService.success('Dados do(a) cliente alterado com sucesso!');
        this.fecharDialogCadastroEdicaoCliente();
        this.listarClientes();
      },
      (error: HttpErrorResponse) => {
        this.processandoCadastroEdicaoCliente = false;

        if (error.status === 422) {
          this.toastrService.error('Existe(m) campo(s) inválido(s)!');
        }
        else {
          this.toastrService.error('Erro ao alterar os dados do(a) cliente!');
        }   
      });
  }

  public armazenarClienteParaVisualizarInformacoes(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.abrirDialogInformacoesCliente = true;
  }

  public fecharDialogInformacoes(): void {
    this.abrirDialogInformacoesCliente = false;
    this.clienteSelecionado = new Cliente;
  }

  public armazenarClienteParaEdicao(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.formularioCliente = Object.assign({}, cliente);
    this.formularioCliente.endereco = Object.assign({}, cliente.endereco);
    this.abrirDialogEdicaoCliente = true;
  }

  public armazenarClienteParaExclusao(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.abrirDialogExclusaoCliente = true;
  }

  public fecharDialogExclusao(): void {
    this.clienteSelecionado = new Cliente();
    this.abrirDialogExclusaoCliente = false;
  }

  public excluirCliente(): void {
    this.processandoExclusaoCliente = true;

    this.clienteService.excluirCliente(this.clienteSelecionado.id)
      .subscribe(() => {
        this.processandoExclusaoCliente = false;
        this.toastrService.success('Cliente excluído(a) com sucesso!');
        this.fecharDialogExclusao();
        this.listarClientes();
      },
      () => {
        this.processandoExclusaoCliente = false;
        this.toastrService.error('Erro ao excluir cliente!');
      });
  }
}
