import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FornecedorService } from './shared/service/fornecedor.service';
import { Fornecedor } from './shared/model/fornecedor.model';
import { FornecedorFORM } from './shared/model/fornecedor.form';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent implements OnInit {

  public fornecedores: Fornecedor[] = [];
  public fornecedorSelecionado: Fornecedor = new Fornecedor();
  public formularioFornecedor: FornecedorFORM = new FornecedorFORM();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesFornecedor: boolean = false;
  public abrirDialogEdicaoFornecedor: boolean = false;
  public abrirDialogExclusaoFornecedor: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroEdicaoFornecedor: boolean = false;
  public processandoExclusaoFornecedor: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private fornecedorService: FornecedorService

  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.listarFornecedores();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'Data do Cadastro', field: 'dataCadastro', style: 'col-dataCadastro' },
      { header: 'Empresa', field: 'nomeEmpresa', style: 'col-nomeEmpresa' },
      { header: 'Telefone', field: 'telefone', style: 'col-telefone' },
      { header: 'Telefone Alternativo', field: 'telefoneAlternativo', style: 'col-telefoneAlternativo' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  public formatarDataCadastroFornecedor(dataCadastro: Date): string {
    if (dataCadastro)  {
      const data: string[] = dataCadastro.toString().split('-');
      return `${data[2]}/${data[1]}/${data[0]}`;
    }
    return '';
  }

  private listarFornecedores(): void {
    this.processandoOperacaoListagem = true;

    this.fornecedorService.listarFornecedores()
      .subscribe((fornecedores: Fornecedor[]) => {
        this.fornecedores = fornecedores;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao listar fornecedores!');
      })
  }

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastroEdicaoFornecedor(): void {
    this.abrirDialogCadastro = false;
    this.abrirDialogEdicaoFornecedor = false;
    this.formularioFornecedor = new FornecedorFORM();
    this.fornecedorSelecionado = new Fornecedor();
  }

  public desabilitarBotaoCadastroEdicaoFornecedor(): boolean {
    return this.processandoCadastroEdicaoFornecedor || !(this.formularioFornecedor
      && this.formularioFornecedor.nomeEmpresa && this.formularioFornecedor.cnpj
      && this.formularioFornecedor.telefone);
  }

  public cadastrarEditarFornecedor(): void {
    if (this.abrirDialogCadastro) {
      this.cadastrarFornecedor();
    }
    else if (this.abrirDialogEdicaoFornecedor) {
      this.alterarDadosFornecedor();
    }
  }

  private cadastrarFornecedor(): void {
    this.processandoCadastroEdicaoFornecedor = true;
  }

  private alterarDadosFornecedor(): void {
    this.processandoCadastroEdicaoFornecedor = true;
  }

  public armazenarFornecedorParaVisualizarInformacoes(fornecedor: Fornecedor): void {
    this.fornecedorSelecionado = fornecedor;
    this.abrirDialogInformacoesFornecedor = true;
  }

  public armazenarFornecedorParaEdicao(fornecedor: Fornecedor): void {
    this.fornecedorSelecionado = fornecedor;
    this.formularioFornecedor = Object.assign({}, fornecedor);
    this.abrirDialogEdicaoFornecedor = true;
  }

  public armazenarFornecedorParaExclusao(fornecedor: Fornecedor): void {
    this.fornecedorSelecionado = fornecedor;
    this.abrirDialogExclusaoFornecedor = true;
  }
}
