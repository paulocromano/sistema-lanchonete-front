import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioPedidoService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/relatorio-pedido`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public gerarRelatorioComTodosPedidos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/todos-pedidos`, {responseType: 'blob' as 'json'});
  }
}
