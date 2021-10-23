import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { ProdutoService } from './shared/service/produto.service';
import { Produto } from './shared/model/produto.model';
import { ProdutoFORM } from './shared/model/produto.form';
import { AlteracaoProdutoFORM } from './shared/model/alteracao-produto.form';

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

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesProduto: boolean = false;
  public abrirDialogEdicaoProduto: boolean = false;
  public abrirDialogExclusaoProduto: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroProduto: boolean = false;
  public processandoEdicaoProduto: boolean = false;
  public processandoExclusaoProduto: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
  }

}
