import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { Pedido } from '../model/pedido.model';
import { InformacaoParaPedido } from '../model/informacao-para-pedido.model';
import { PedidoFORM } from '../model/pedido.form';
import { PedidoLancheFORM } from '../../pedido-lanche/shared/model/pedido-lanche.form';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/pedido`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public buscarPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  public buscarInformacaoParaPedido(): Observable<InformacaoParaPedido> {
    return this.http.get<InformacaoParaPedido>(`${this.baseUrl}/informacao-para-pedido`);
  }

  public cadastrarPedido(formularioPedido: PedidoFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioPedido);
  }

  public definirPedidoComoEntregue(idPedido: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/definir-pedigo-como-entregue/${idPedido}`, null);
  }

  public excluirPedido(idPedido: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${idPedido}`);
  }

  public finalizarPedido(idPedido: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/finalizar-pedido/${idPedido}`, null);
  }
}
