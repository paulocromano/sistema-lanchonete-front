import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Lanche } from './shared/model/lanche.model';
import { LancheFORM } from './shared/model/lanche.form';
import { LancheService } from './shared/service/lanche.service';
import { ImagemLancheBase64 } from './shared/model/imagem-lanche-base-64.model';
import { HttpErrorResponse } from '@angular/common/http';

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
  public processandoUploadImagemLanche: boolean = false;
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
    const desabilitarBotao: boolean = this.processandoCadastroEdicaoLanche || this.processandoUploadImagemLanche
    || !(this.formularioLanche && this.formularioLanche.nome
      && this.formularioLanche.ingredientes && this.formularioLanche.preco
      && this.formularioLanche.imagemBase64);

    return this.abrirDialogCadastro ? desabilitarBotao : desabilitarBotao || !this.dadosLancheSofreramAlteracoes();
  }

  private dadosLancheSofreramAlteracoes(): boolean {
    return this.formularioLanche.nome !== this.lancheSelecionado.nome
      || this.formularioLanche.ingredientes !== this.lancheSelecionado.ingredientes
      || this.formularioLanche.preco !== this.lancheSelecionado.preco.toString()
      || this.formularioLanche.imagemBase64 !== this.lancheSelecionado.imagemBase64;
  }

  public eventoPerdaFocoBolsaMensal(): void {
    if (this.formularioLanche.preco && this.formularioLanche.preco !== '') {
      const valorBolsa: string[] = this.formularioLanche.preco.split(',');
      
      if (valorBolsa.length === 1) {
        this.formularioLanche.preco += ',00';
      }
      else if (valorBolsa.length === 2) {
        if (valorBolsa[1] === '') {
          this.formularioLanche.preco += '00';
        }
        else if (valorBolsa.length === 2 && valorBolsa[1].length === 1) {
          this.formularioLanche.preco += '0';
        }
      }
    }
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
    this.processandoUploadImagemLanche = true;
    const imagem: File = eventoUpload.srcElement.files[0];

    this.lancheService.encodeImagemLancheParaBase64(imagem)
      .subscribe((imagem: ImagemLancheBase64) => {
        this.formularioLanche.imagemBase64 = imagem.imagemBase64;
        this.processandoUploadImagemLanche = false;
      },
      () => {
        this.processandoUploadImagemLanche = false;
        this.formularioLanche.imagemBase64 = null;
        this.toastrService.error('Erro ao fazer upload da imagem!');
      });
  }

  private cadastrarLanche(): void {
    this.processandoCadastroEdicaoLanche = true;

    this.lancheService.cadastrarLanche(this.formularioLanche)
      .subscribe(() => {
        this.processandoCadastroEdicaoLanche = false;
        this.toastrService.success('Lanche cadastrado com sucesso!');
        this.fecharDialogCadastroEdicaoLanche();
        this.listarLanches();
      },
      (error: HttpErrorResponse) => {
        this.processandoCadastroEdicaoLanche = false;

        if (error.status === 422) {
          this.toastrService.error('Erro de validação de campos!');
        }
        else {
          this.toastrService.error('Erro ao cadastrar lanche!');
        }
      });
  }

  private alterarDadosLanche(): void {
    this.processandoCadastroEdicaoLanche = true;

    this.lancheService.alterarDadosLanche(this.lancheSelecionado.id, this.formularioLanche)
      .subscribe(() => {
        this.processandoCadastroEdicaoLanche = false;
        this.toastrService.success('Dados do lanche alterado com sucesso!');
        this.fecharDialogCadastroEdicaoLanche();
        this.listarLanches();
      },
      () => {
        this.processandoUploadImagemLanche = false;
        this.formularioLanche.imagemBase64 = null;
        this.toastrService.error('Erro ao alterar os dados do lanche!');
      });
  }

  public fecharDialogExclusaoLanche(): void {
    this.abrirDialogExclusaoLanche = false;
    this.lancheSelecionado = new Lanche();
  }

  public excluirLanche(): void {
    this.processandoExclusaoLanche = true;

    this.lancheService.excluirLanche(this.lancheSelecionado.id)
      .subscribe(() => {
        this.processandoExclusaoLanche = false;
        this.toastrService.success('Lanche excluído com sucesso!');
        this.fecharDialogExclusaoLanche();
        this.listarLanches();
      },
      () => {
        this.processandoExclusaoLanche = false;
        this.toastrService.error('Erro ao excluir lanche!');
      });
  }

  public fecharDialogInformacoes(): void {
    this.lancheSelecionado = new Lanche();
    this.abrirDialogInformacoesLanche = false;
  }

  public armazenarLancheParaVisualizarInformacoes(lanche: Lanche): void {
    this.lancheSelecionado = lanche;
    this.abrirDialogInformacoesLanche = true;
  }

  public armazenarLancheParaEdicao(lanche: Lanche): void {
    this.lancheSelecionado = lanche;
    this.converterParaFormularioLanche(Object.assign({}, lanche));
    this.abrirDialogEdicaoLanche = true;
  }

  private converterParaFormularioLanche(lancheSelecionado: Lanche): void {
    const lanche: Lanche = lancheSelecionado;

    this.formularioLanche.nome = lanche.nome;
    this.formularioLanche.ingredientes = lanche.ingredientes;
    this.formularioLanche.preco = lanche.preco.toString();
    this.formularioLanche.imagemBase64 = lanche.imagemBase64;
  }

  public armazenarLancheParaExclusao(lanche: Lanche): void {
    this.lancheSelecionado = lanche;
    this.abrirDialogExclusaoLanche = true;
  }

  public formatarDataCadastroCliente(dataCadastro: Date): string {
    if (dataCadastro)  {
      const data: string[] = dataCadastro.toString().split('-');
      return `${data[2]}/${data[1]}/${data[0]}`;
    }
    return '';
  }
}
