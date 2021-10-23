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
  public mesa: Mesa = new Mesa();
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
  }

}
