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
  public processandoCadastroCliente: boolean = false;
  public processandoBuscaCep: boolean = false;

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

  public fecharDialogCadastroCliente(): void {
    this.abrirDialogCadastro = false;
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

  public desabilitarBotaoCadastroCliente(): boolean {
    const endereco: EnderecoFORM = this.formularioCliente.endereco;

    return this.processandoCadastroCliente || !(this.formularioCliente
      && this.formularioCliente.nome && this.formularioCliente.telefone
      && endereco && endereco.logradouro && endereco.numero 
      && endereco.bairro && endereco.cidade && endereco.uf);
  }

  public cadastrarCliente(): void {
    this.processandoCadastroCliente = true;

    this.clienteService.cadastrarCliente(this.formularioCliente)
      .subscribe(() => {
        this.processandoCadastroCliente = false;
        this.toastrService.success('Cliente cadastrado(a) com sucesso!');
        this.fecharDialogCadastroCliente();
        this.listarClientes();
      },
      (error: HttpErrorResponse) => {
        this.processandoCadastroCliente = false;

        if (error.status === 422) {
          this.toastrService.error('Existe(m) campo(s) inválido(s)!');
        }
        else {
          this.toastrService.error('Erro ao cadastrar cliente!');
        }
      })
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
    this.abrirDialogEdicaoCliente = true;
  }

  public armazenarClienteParaExclusao(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.abrirDialogExclusaoCliente = true;
  }
}
