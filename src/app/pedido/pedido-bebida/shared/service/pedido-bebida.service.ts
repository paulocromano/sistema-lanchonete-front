import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { PedidoBebidaFORM } from '../model/pedido-bebida.form';

@Injectable({
  providedIn: 'root'
})
export class PedidoBebidaService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/pedido-bebida`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public adicionarBebidaAoPedido(idPedido: number, formularioPedidoBebida: PedidoBebidaFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/adicionar-bebida/${idPedido}`, formularioPedidoBebida);
  }

  public excluirBebidaDoPedido(idPedido: number, idPedidoBebida: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/excluir-bebida-pedido/${idPedido}/${idPedidoBebida}`, null);
  }
}
