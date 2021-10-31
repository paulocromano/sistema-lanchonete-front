import { Component, OnInit } from '@angular/core';
import { Colaborador } from '../shared/model/colaborador.model';
import { UsuarioService } from './../shared/service/usuario.service';
import { ColaboradorFORM } from './../shared/model/colaborador.form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tabela-colaboradores',
  templateUrl: './tabela-colaboradores.component.html',
  styleUrls: ['./tabela-colaboradores.component.css']
})

export class TabelaColaboradoresComponent implements OnInit {

  public colaboradores: Colaborador[] = [];
  public colaboradorSelecionado: Colaborador = new Colaborador();
  public formularioColaborador: ColaboradorFORM = new ColaboradorFORM();

  public colunasTabela: any[];
  public processandoOperacao: boolean = false;
  public exibirDialogCadastro: boolean = false;
  public exibirDialogExclusao: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private toastrService: ToastrService   
    ) { }

  ngOnInit(): void {
    this.colunasTabela = [
      { header: 'Nome', field: 'nome', style: 'col-nome' },
      { header: 'Data da Admissão', field: 'dataCadastro', style: 'col-data-cadastro' },
      { header: 'Ações', field: 'acoes', style: 'col-acoes' }
    ];

    this.listarColaboradores();
  }

  private listarColaboradores(): void {
    this.processandoOperacao = true;

    this.usuarioService.listarUsuariosEmOrdemAlfabetica()
      .subscribe((colaboradores: Colaborador[]) => {
        this.colaboradores = colaboradores;
        this.processandoOperacao = false;
      },
      () => {
        this.processandoOperacao = false;
        this.toastrService.error('Erro ao listar colaboradores!');
      });
  }

  public abrirDialogCadastro(): void {
    this.exibirDialogCadastro = true;
  }

  public cadastrarUsuario(): void {
    this.processandoOperacao = true;

    this.usuarioService.cadastrarUsuario(this.formularioColaborador)
      .subscribe(() => {
        this.resetarCampos();
        this.toastrService.success('Colaborador cadastrado com sucesso!');
        this.processandoOperacao = false;
        this.listarColaboradores();
      },
      () => {
        this.processandoOperacao = false;
        this.toastrService.error('Erro ao cadastrar colaborador!');
      });
  }

  public desabilitarBotaoCadastro(): boolean {
    return this.processandoOperacao || !(this.formularioColaborador
      && this.formularioColaborador.nome && this.formularioColaborador.email
      && this.formularioColaborador.senha && this.formularioColaborador.senha.length >= 6 
      && this.formularioColaborador.senha.length <= 20);
  }

  public armazenarUsuarioParaExclusao(colaborador: Colaborador): void {
    this.colaboradorSelecionado = colaborador;
    this.exibirDialogExclusao = true;
  }

  public excluirUsuario(): void {
    this.processandoOperacao = true;

    this.usuarioService.removerUsuario(this.colaboradorSelecionado.id)
      .subscribe(() => {
        this.resetarCampos();
        this.toastrService.success('Colaborador excluído com sucesso!');
        this.processandoOperacao = false;
        this.listarColaboradores();
      },
      () => {
        this.processandoOperacao = false;
        this.toastrService.error('Erro ao excluir colaborador!');
      });
  }

  public resetarCampos(): void {
    this.exibirDialogCadastro = false;
    this.exibirDialogExclusao = false;

    this.colaboradorSelecionado = new Colaborador();
    this.formularioColaborador = new ColaboradorFORM();
  }
}
