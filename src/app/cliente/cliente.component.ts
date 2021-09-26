import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Cliente } from './shared/model/cliente.model';
import { ClienteFORM } from './shared/model/cliente.form';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: Cliente[] = [];
  public clienteSelecionado: Cliente = new Cliente();
  public formularioCliente: ClienteFORM = new ClienteFORM();

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.toastrService.success('Deu sucesso!');
    
  }

}
