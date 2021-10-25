import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ProdutoService } from './shared/service/produto.service';
import { Produto } from './shared/model/produto.model';
import { ProdutoFORM } from './shared/model/produto.form';
import { AlteracaoProdutoFORM } from './shared/model/alteracao-produto.form';
import { FornecedorService } from '../fornecedor/shared/service/fornecedor.service';
import { Fornecedor } from '../fornecedor/shared/model/fornecedor.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  public produtos: Produto[] = [];
  public produtoSelecionado: Produto = new Produto();
  public formularioProduto: ProdutoFORM = new ProdutoFORM();
  public formularioAlteracaoDadosProduto: AlteracaoProdutoFORM = new AlteracaoProdutoFORM();
  public forncedoresDropdown: SelectItem[] = [];

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesProduto: boolean = false;
  public abrirDialogEdicaoProduto: boolean = false;
  public abrirDialogExclusaoProduto: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoFornecedoresParaCadastroDeProduto: boolean = false;
  public processandoCadastroProduto: boolean = false;
  public processandoEdicaoProduto: boolean = false;
  public processandoExclusaoProduto: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private produtoService: ProdutoService,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.buscarProdutos();
    this.buscarFornecedoresParaCadastroDeProduto();
  }

  private definirColunasTabela() {
    this.colunasTabela = [
      { header: 'Descrição', field: 'descricao', ordenavel: true, style: 'col-descricao' },
      { header: 'Tipo', field: 'tipoProduto', ordenavel: true, style: 'col-tipo-produto' },
      { header: 'Quantidade', field: 'quantidade', ordenavel: true, style: 'col-quantidade' },
      { header: 'Preço R$', field: 'preco', ordenavel: false, style: 'col-preco' },
      { header: 'Ações', style: 'col-acoes' }
    ];
  }

  private buscarProdutos(): void {
    this.processandoOperacaoListagem = true;

    this.produtoService.buscarProdutos()
      .subscribe((produtos: Produto[]) => {
        this.produtos = produtos;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao buscar produtos!');
      })
  }

  private buscarFornecedoresParaCadastroDeProduto(): void {
    this.processandoFornecedoresParaCadastroDeProduto = true;

    this.fornecedorService.listarFornecedores()
      .subscribe((fornecedores: Fornecedor[]) => {
        fornecedores.forEach(fornecedor => this.forncedoresDropdown.push({ label: fornecedor.nomeEmpresa, value: fornecedor.id }));
        this.processandoFornecedoresParaCadastroDeProduto = false;
      }, 
      () => {
        this.processandoFornecedoresParaCadastroDeProduto = false;
        this.toastrService.error('Erro ao buscar fornecedores para cadastro de Produto!');
      });
  }

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastroProduto(): void {
    this.abrirDialogCadastro = false;
    this.formularioProduto = new ProdutoFORM();
  }

  public desabilitarBotaoCadastroProduto(): boolean {
    return this.processandoCadastroProduto || !(this.formularioProduto
      && this.formularioProduto.idFornecedor && this.formularioProduto.descricao
      && this.formularioProduto.preco && this.formularioProduto.tipoProduto
      && this.formularioProduto.quantidade && this.formularioProduto.quantidadeMinimaEstoque);
  }

  public cadastrarProduto(): void {
    this.processandoCadastroProduto = true;
    this.formularioProduto.preco = this.formularioProduto.preco.toString().replace(',', '.');

    this.produtoService.cadastrarProduto(this.formularioProduto)
      .subscribe(() => {
        this.processandoCadastroProduto = false;
        this.toastrService.success('Produto cadastrado com sucesso!');
        this.fecharDialogCadastroProduto();
        this.buscarProdutos();
      },
      () => {
        this.processandoCadastroProduto = false;
        this.toastrService.error('Erro ao cadastrar o Produto!');
      });
  }

  public armazenarProdutoParaVisualizarInformacoes(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.abrirDialogInformacoesProduto = true;
  }

  public fecharDialogVisualizacaoProduto(): void {
    this.abrirDialogInformacoesProduto = false;
    this.produtoSelecionado = new Produto();
  }

  public armazenarProdutoParaEdicao(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.formularioAlteracaoDadosProduto = this.produtoSelecionado;
    this.abrirDialogEdicaoProduto = true;
  }

  public fecharDialogEdicaoProduto(): void {
    this.abrirDialogEdicaoProduto = false;
    this.produtoSelecionado = new Produto();
    this.formularioAlteracaoDadosProduto = new AlteracaoProdutoFORM();
  }

  public desabilitarBotaoAlteracaoDadosDoProduto(): boolean {
    return this.processandoEdicaoProduto || !(this.formularioAlteracaoDadosProduto
      && this.formularioAlteracaoDadosProduto.preco && this.formularioAlteracaoDadosProduto.quantidade 
      && this.formularioAlteracaoDadosProduto.quantidadeMinimaEstoque);
  }

  public alterarDadosProduto(): void {
    this.processandoEdicaoProduto = true;
    this.formularioAlteracaoDadosProduto.preco = this.formularioAlteracaoDadosProduto.preco.toString().replace(',', '.');

    this.produtoService.alterarDadosProduto(this.produtoSelecionado.id, this.formularioAlteracaoDadosProduto)
      .subscribe(() => {
        this.processandoEdicaoProduto = false;
        this.toastrService.success('Dados do Produto alterado com sucesso!');
        this.fecharDialogEdicaoProduto();
        this.buscarProdutos();
      },
      () => {
        this.processandoEdicaoProduto = false;
        this.toastrService.error('Erro ao alterar os dados do Produto!');
      });
  }

  public armazenarProdutoParaExclusao(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.abrirDialogExclusaoProduto = true;
  }

  public fecharDialogExclusaoProduto(): void {
    this.abrirDialogExclusaoProduto = false;
    this.produtoSelecionado = new Produto();
  }

  public excluirProduto(): void {
    this.processandoExclusaoProduto = true;

    this.produtoService.excluirProduto(this.produtoSelecionado.id)
      .subscribe(() => {
        this.processandoExclusaoProduto = false;
        this.toastrService.success('Produto excluído com sucesso!');
        this.fecharDialogExclusaoProduto();
        this.buscarProdutos();
      },
      ()=> {
        this.processandoExclusaoProduto = false;
        this.toastrService.error('Erro ao excluir o Produto!');
      });
  }
}
