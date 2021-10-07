import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { DespesaService } from './shared/service/despesa.service';
import { Despesa } from './shared/model/despesa.model';
import { DespesaFORM } from './shared/model/despesa.form';
import { AlteracaoDespesaFORM } from './shared/model/alteracao-despesa.form';
import { InformacoesCadastroDespesa } from './shared/model/informacoes-cadastro-despesa.model';
import { DadosEnum } from './shared/model/dados-enum.model';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent implements OnInit {

  public despesas: Despesa[] = [];
  public despesaSelecionada: Despesa = new Despesa();
  public formularioDespesa: DespesaFORM = new DespesaFORM();
  public formularioAlteracaoDespesa: AlteracaoDespesaFORM = new AlteracaoDespesaFORM();
  public tipoDespesaSelecionada: DadosEnum = new DadosEnum();
  public tiposDespesa: DadosEnum[] = [];

  public colunasTabela: any;
  public inputPesquisa: string;
  public formatoCalendario: any;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesDespesa: boolean = false;
  public abrirDialogEdicaoDespesa: boolean = false;
  public abrirDialogPagamentoDespesa: boolean = false;
  public abrirDialogExclusaoDespesa: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroDespesa: boolean = false;
  public processandoEdicaoDespesa: boolean = false;
  public processandoPagamentoDespesa: boolean = false;
  public processandoExclusaoDespesa: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private despesaService: DespesaService
    ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.carregarFormatoDoCalendario();
    this.buscarInformacoesParaCadastroDespesa();
    this.listarDespesas();
  }

  public se($e): void {
    console.log($e)
  }

  private definirColunasTabela(): void {
    this.colunasTabela = [
      { header: 'Data do Vencimento', field: 'dataVencimento', style: 'col-dataVencimento' },
      { header: 'Descrição', field: 'descricao', style: 'col-descricao' },
      { header: 'Valor R$', field: 'valor', style: 'col-valor' },
      { header: 'Situação', field: 'situacao', style: 'col-situacao' },
      { header: 'Tipo', field: 'tipoDespesa', style: 'col-tipoDespesa' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];
  }

  private carregarFormatoDoCalendario(){
    this.formatoCalendario = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro'
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yy'
    };
  }


  public formatarData(dataCadastro: Date): string {
    if (dataCadastro)  {
      const data: string[] = dataCadastro.toString().split('-');
      return `${data[2]}/${data[1]}/${data[0]}`;
    }
    return '---';
  }

  private listarDespesas(): void {
    this.processandoOperacaoListagem = true;

    this.despesaService.listarDespesas()
      .subscribe((despesas: Despesa[]) => {
        this.despesas = despesas;
        this.processandoOperacaoListagem = false;
      },
      () => {
        this.processandoOperacaoListagem = false;
        this.toastrService.error('Erro ao listar despesas!');
      });
  }

  private buscarInformacoesParaCadastroDespesa(): void {
    this.despesaService.buscarInformacoesParaCadastroDespesa()
      .subscribe((informacoesCadastro: InformacoesCadastroDespesa) => {
        this.tiposDespesa = informacoesCadastro.tiposDespesa;
      },
      () => {
        this.toastrService.error('Erro ao buscar as informações para cadastro de despesa')!
      });
  }

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public fecharDialogCadastro(): void {
    this.abrirDialogCadastro = false;
    this.formularioDespesa = new DespesaFORM();
  }

  public desabilitarBotaoConfirmarCadastroDespesa(): boolean {
    return this.processandoCadastroDespesa || !(this.formularioDespesa
      && this.formularioDespesa.descricao && this.tipoDespesaSelecionada
      && this.formularioDespesa.valor && this.formularioDespesa.dataVencimento);
  }

  public cadastrarDespesa(): void {
    this.processandoCadastroDespesa = true;
    this.formularioDespesa.tipoDespesa = this.tipoDespesaSelecionada.codigo;
    this.formularioDespesa.valor =  this.formularioDespesa.valor.toString().replace(',', '.');

    this.despesaService.cadastrarDespesa(this.formularioDespesa)
      .subscribe(() => {
        this.processandoCadastroDespesa = false;
        this.toastrService.success('Despesa cadastrada com sucesso!');
        this.fecharDialogCadastro();
        this.listarDespesas();
      },
      (error: HttpErrorResponse) => {
        this.processandoCadastroDespesa = false;

        if (error.status === 422) {
          this.toastrService.warning('Erro de validação de campos!');
        }
        else {
          this.toastrService.error('Erro ao cadastrar Despesa!');
        }
      });
  }

  public alterarDespesa(): void {
    this.processandoEdicaoDespesa = true;
    this.formularioAlteracaoDespesa.valor = this.formularioAlteracaoDespesa.valor.replace(',', '.');
    
    this.despesaService.alterarDespesa(this.despesaSelecionada.id, this.formularioAlteracaoDespesa)
      .subscribe(() => {
        this.processandoEdicaoDespesa = false;
        this.toastrService.success('Dados da Despesa alterada com sucesso!');
        this.fecharDialogAlteracaoDespesa();
        this.listarDespesas();
      },
      (error: HttpErrorResponse) => {
        this.processandoEdicaoDespesa = false;

        if (error.status === 422) {
          this.toastrService.warning('Erro de validação de campos!');
        }
        else {
          this.toastrService.error('Erro ao alterar Despesa!');
        }
      });
  }

  public confirmarPagamentoDespesa(): void {
    this.processandoPagamentoDespesa = true;

    this.despesaService.confirmarPagamentoDespesa(this.despesaSelecionada.id)
      .subscribe(() => {
        this.processandoPagamentoDespesa = false;
        this.toastrService.success('Despesa paga com sucesso!');
        this.fecharDialogPagamentoDespesa();
        this.listarDespesas();
      },
      () => {
        this.processandoPagamentoDespesa = false;
        this.toastrService.error('Erro ao confirmar o pagamento da Despesa!');
      });
  }

  public excluirDespesa(): void {
    this.processandoExclusaoDespesa = true;

    this.despesaService.excluirDespesa(this.despesaSelecionada.id)
      .subscribe(() => {
        this.processandoExclusaoDespesa = false;
        this.toastrService.success('Despesa excluída com sucesso!');
        this.fecharDialogExclusaoDespesa();
        this.listarDespesas();
      },
      () => {
        this.processandoExclusaoDespesa = false;
        this.toastrService.error('Erro ao excluir a Despesa!');
      });
  }

  public exibirDialogInformacoes(despesa: Despesa): void {
    this.despesaSelecionada = despesa;
    this.abrirDialogInformacoesDespesa = true;
  }
  
  public fecharDialogInformacoes(): void {
    this.abrirDialogInformacoesDespesa = false;
    this.despesaSelecionada = new Despesa();
  }

  public exibirDialogAlteracaoDespesa(despesa: Despesa): void {
    this.formularioAlteracaoDespesa.descricao = despesa.descricao;
    this.formularioAlteracaoDespesa.valor =  despesa.valor.toString().replace('.', ',');
    this.despesaSelecionada = despesa;
    this.abrirDialogEdicaoDespesa = true;
  }

  public fecharDialogAlteracaoDespesa(): void {
    this.abrirDialogEdicaoDespesa = false;
    this.formularioAlteracaoDespesa = new AlteracaoDespesaFORM();
    this.despesaSelecionada = new Despesa();
  }

  public eventoPerdaFocoValorCadastroDespesa(): void {
    if (this.formularioDespesa.valor && this.formularioDespesa.valor !== '') {
      const valorBolsa: string[] = this.formularioDespesa.valor.split(',');
      
      if (valorBolsa.length === 1) {
        this.formularioDespesa.valor += ',00';
      }
      else if (valorBolsa.length === 2) {
        if (valorBolsa[1] === '') {
          this.formularioDespesa.valor += '00';
        }
        else if (valorBolsa.length === 2 && valorBolsa[1].length === 1) {
          this.formularioDespesa.valor += '0';
        }
      }
    }
  }

  public eventoPerdaFocoValorAlteracaoDespesa(): void {
    if (this.formularioAlteracaoDespesa.valor && this.formularioAlteracaoDespesa.valor !== '') {
      const valorBolsa: string[] = this.formularioAlteracaoDespesa.valor.split(',');
      
      if (valorBolsa.length === 1) {
        this.formularioAlteracaoDespesa.valor += ',00';
      }
      else if (valorBolsa.length === 2) {
        if (valorBolsa[1] === '') {
          this.formularioAlteracaoDespesa.valor += '00';
        }
        else if (valorBolsa.length === 2 && valorBolsa[1].length === 1) {
          this.formularioAlteracaoDespesa.valor += '0';
        }
      }
    }
  }

  public desabilitarBotaoConfirmarAlteracoesDaDespesa(): boolean {
    return this.processandoEdicaoDespesa || !(this.formularioAlteracaoDespesa
      && this.formularioAlteracaoDespesa.descricao && this.formularioAlteracaoDespesa.valor
      && this.formularioAlteracaoDespesa.descricao !== this.despesaSelecionada.descricao
      || this.formularioAlteracaoDespesa.valor !== this.despesaSelecionada.valor?.toString().replace('.', ','));
  }

  public exibirDialogpagarDespesa(despesa: Despesa): void {
    this.despesaSelecionada = despesa;
    this.abrirDialogPagamentoDespesa = true;
  }

  public fecharDialogPagamentoDespesa(): void {
    this.abrirDialogPagamentoDespesa = false;
    this.despesaSelecionada = new Despesa();
  }

  public exibirDialogExcluirDespesa(despesa: Despesa): void {
    this.despesaSelecionada = despesa;
    this.abrirDialogExclusaoDespesa = true;
  }

  public fecharDialogExclusaoDespesa(): void {
    this.abrirDialogExclusaoDespesa = false;
    this.despesaSelecionada = new Despesa();
  }
}
