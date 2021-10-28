import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { PedidoLancheFORM } from '../model/pedido-lanche.form';

@Injectable({
  providedIn: 'root'
})
export class PedidoLancheService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/pedido-lanche`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public adicionarLancheAoPedido(idPedido: number, formularioPedidoLanche: PedidoLancheFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/adicionar-lanche/${idPedido}`, formularioPedidoLanche);
  }

  public excluirLancheDoPedido(idPedido: number, idLanche: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/excluir-lanche-pedido/${idPedido}/${idLanche}`, null);
  }
}
