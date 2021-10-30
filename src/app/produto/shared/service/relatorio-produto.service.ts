import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioProdutoService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/relatorio-produto`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public gerarRelatorioComTodosProdutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/todos-produtos`, {responseType: 'blob' as 'json'});
  }

  public gerarRelatorioComProdutosAbaixoDoEstoqueMinimo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/produtos-abaixo-estoque-minimo`, {responseType: 'blob' as 'json'});
  }
}
