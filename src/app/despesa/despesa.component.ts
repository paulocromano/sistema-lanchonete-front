import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

import { DespesaService } from './shared/service/despesa.service';
import { Despesa } from './shared/model/despesa.model';
import { DespesaFORM } from './shared/model/despesa.form';
import { AlteracaoDespesaFORM } from './shared/model/alteracao-despesa.form';

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

  public colunasTabela: any;
  public inputPesquisa: string;

  public abrirDialogCadastro: boolean = false; 
  public abrirDialogInformacoesDespesa: boolean = false;
  public abrirDialogEdicaoDespesa: boolean = false;
  public abrirDialogExclusaoDespesa: boolean = false;

  public processandoOperacaoListagem: boolean = false;
  public processandoCadastroDespesa: boolean = false;
  public processandoEdicaoDespesa: boolean = false;
  public processandoExclusaoDespesa: boolean = false;

  constructor(
    private toastrService: ToastrService,
    private despesaService: DespesaService
    ) { }

  ngOnInit(): void {
    this.definirColunasTabela();
    this.listarDespesas();
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

  public exibirDialogCadastro(): void {
    this.abrirDialogCadastro = true;
  }

  public cadastrarDespesa(): void {
    this.processandoCadastroDespesa = true;

    this.despesaService.cadastrarDespesa(this.formularioDespesa)
      .subscribe(() => {
        this.processandoCadastroDespesa = false;
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

    this.despesaService.alterarDespesa(this.despesaSelecionada.id, this.formularioAlteracaoDespesa)
      .subscribe(() => {
        this.processandoEdicaoDespesa = false;
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
    this.processandoEdicaoDespesa = true;

    this.despesaService.confirmarPagamentoDespesa(this.despesaSelecionada.id)
      .subscribe(() => {
        this.processandoEdicaoDespesa = false;
        this.listarDespesas();
      },
      () => {
        this.processandoEdicaoDespesa = false;
        this.toastrService.error('Erro ao confirmar o pagamento da Despesa!');
      });
  }

  public excluirDespesa(): void {
    this.processandoExclusaoDespesa = true;

    this.despesaService.excluirDespesa(this.despesaSelecionada.id)
      .subscribe(() => {
        this.processandoExclusaoDespesa = false;
        this.listarDespesas();
      },
      () => {
        this.processandoExclusaoDespesa = false;
        this.toastrService.error('Erro ao excluir a Despesa!');
      });
  }
}
