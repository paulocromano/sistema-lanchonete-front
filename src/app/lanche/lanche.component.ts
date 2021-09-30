import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Lanche } from './shared/model/lanche.model';
import { LancheFORM } from './shared/model/lanche.form';
import { LancheService } from './shared/service/lanche.service';

@Component({
  selector: 'app-lanche',
  templateUrl: './lanche.component.html',
  styleUrls: ['./lanche.component.css']
})
export class LancheComponent implements OnInit {

  public lanches: Lanche[] = [];
  public lancheSelecionado: Lanche = new Lanche();
  public formularioLanche: LancheFORM = new LancheFORM();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesLanche: boolean = false;
  public abrirDialogEdicaoLanche: boolean = false;
  public abrirDialogExclusaoLanche: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroEdicaoLanche: boolean = false;
  public processandoExclusaoLanche: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private lancheService: LancheService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.listarLanches();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'Imagem', field: 'imagemBase64', style: 'col-imagemBase64' },
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Ingredientes', field: 'ingredientes', style: 'col-ingredientes' },
      { header: 'Preço R$', field: 'preco', style: 'col-preco' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  private listarLanches(): void {
    this.processandoOperacaoListagem = true;

    this.lancheService.listarLanches()
      .subscribe((lanches: Lanche[]) => {
        this.lanches = lanches;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao listar lanches!');
      });
  }

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastroEdicaoLanche(): void {
    this.abrirDialogCadastro = false;
    this.abrirDialogEdicaoLanche = false;
    this.lancheSelecionado = new Lanche();
    this.formularioLanche = new LancheFORM();
  }

  public desabilitarBotaoCadastroEdicaoLanche(): boolean {
    return;
  }

  public cadastrarEditarLanche(): void {
    if (this.abrirDialogCadastro) {
      this.cadastrarLanche();
    }
    else if (this.abrirDialogEdicaoLanche) {
      this.alterarDadosLanche();
    }
  }

  public eventoImagemSelecionadaParaEnvio(eventoUpload: any): void {
    const imagens: FileList = eventoUpload.srcElement.files
    console.log(imagens)

    this.lancheService.encodeImagemLancheParaBase64(imagens[0])
      .subscribe((base64: any) => {
        console.log(base64)
      },
      (error) => console.log(error))
  }

  private cadastrarLanche(): void {
    this.processandoCadastroEdicaoLanche = true;
  }

  private alterarDadosLanche(): void {
    this.processandoCadastroEdicaoLanche = true;
  }

  public armazenarLancheParaVisualizarInformacoes(lanche: Lanche): void {
    this.lancheSelecionado = lanche;
    this.abrirDialogInformacoesLanche = true;
  }

  public armazenarLancheParaEdicao(lanche: Lanche): void {
    this.lancheSelecionado = lanche;
    this.abrirDialogEdicaoLanche = true;
  }

  public armazenarLancheParaExclusao(lanche: Lanche): void {
    this.lancheSelecionado = lanche;
    this.abrirDialogExclusaoLanche = true;
  }
}
