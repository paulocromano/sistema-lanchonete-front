import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AlteracaoMesaFORM } from './shared/model/alteracao-mesa.form';
import { MesaFORM } from './shared/model/mesa.form';
import { Mesa } from './shared/model/mesa.model';

import { MesaService } from './shared/service/mesa.service'

@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  public mesas: Mesa[] = [];
  public mesaSelecionada: Mesa = new Mesa();
  public formularioMesa: MesaFORM = new MesaFORM();
  public formularioAlteracaoDadosMesa: AlteracaoMesaFORM = new AlteracaoMesaFORM();

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesMesa: boolean = false;
  public abrirDialogEdicaoMesa: boolean = false;
  public abrirDialogExclusaoMesa: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroMesa: boolean = false;
  public processandoEdicaoMesa: boolean = false;
  public processandoExclusaoMesa: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private mesaService: MesaService
  ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.buscarMesas();
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'Número', field: 'numero', ordenavel: true, style: 'col-numero' },
      { header: 'Mesa Ativa', field: 'mesaAtiva', ordenavel: false, style: 'col-mesa-ativa' },
      { header: 'Ações', style: 'col-acoes' }
    ];
  }

  private buscarMesas(): void {
    this.processandoOperacaoListagem = true;

    this.mesaService.buscarMesas()
      .subscribe((mesas: Mesa[]) => {
        this.mesas = mesas;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao buscar mesas!');
      });
  }

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastroMesa(): void {
    this.abrirDialogCadastro = false;
    this.formularioMesa = new MesaFORM();
  }

  public desabilitarBotaoCadastroMesa(): boolean {
    return this.processandoCadastroMesa || !(this.formularioMesa && this.formularioMesa.numero
      && this.formularioMesa.numero > 0);
  }

  public cadastrarMesa(): void {
    this.processandoCadastroMesa = true;

    this.mesaService.cadastrarMesa(this.formularioMesa)
      .subscribe(() => {
        this.processandoCadastroMesa = false;
        this.toastrService.success('Mesa cadastrada com sucesso!');
        this.fecharDialogCadastroMesa();
        this.buscarMesas();
      },
      () => {
        this.processandoCadastroMesa = false;
        this.toastrService.error('Erro ao cadastrar mesa!');
      });
  }

  public armazenarMesaParaEdicao(mesa: Mesa): void {
    this.mesaSelecionada = mesa;
    this.formularioAlteracaoDadosMesa.mesaAtiva = this.mesaSelecionada.mesaAtiva.substring(0, 1);
    this.abrirDialogEdicaoMesa = true;
  }

  public fecharDialogEdicaoMesa(): void {
    this.abrirDialogEdicaoMesa = false;
    this.mesaSelecionada = new Mesa();
    this.formularioAlteracaoDadosMesa = new AlteracaoMesaFORM();
  }

  public desabilitarBotaoEdicaoMesa(): boolean {
    return this.processandoEdicaoMesa || !(this.formularioAlteracaoDadosMesa
      && this.formularioAlteracaoDadosMesa.mesaAtiva);
  }

  public alterarDadosMesa(): void {
    this.processandoEdicaoMesa = true;

    this.mesaService.alterarDadosMesa(this.mesaSelecionada.id, this.formularioAlteracaoDadosMesa)
      .subscribe(() => {
        this.processandoEdicaoMesa = false;
        this.toastrService.success('Dados da mesa alterado com sucesso!');
        this.fecharDialogEdicaoMesa();
        this.buscarMesas();
      },
      () => {
        this.processandoEdicaoMesa = false;
        this.toastrService.error('Erro ao alterar os dados da mesa!');
      });
  }

  public armazenarMesaParaExclusao(mesa: Mesa): void {
    this.mesaSelecionada = mesa;
    this.abrirDialogExclusaoMesa = true;
  }

  public fecharDialogExclusaoMesa(): void {
    this.abrirDialogExclusaoMesa = false;
    this.mesaSelecionada = new Mesa();
  }

  public excluirMesa(): void {
    this.processandoExclusaoMesa = true;

    this.mesaService.excluirMesa(this.mesaSelecionada.id)
      .subscribe(() => {
        this.processandoExclusaoMesa = false;
        this.toastrService.success('Mesa excluída com sucesso!');
        this.fecharDialogExclusaoMesa();
        this.buscarMesas();
      },
      () => {
        this.processandoExclusaoMesa = false;
        this.toastrService.error('Erro ao excluir a mesa!');
      });
  }
}
