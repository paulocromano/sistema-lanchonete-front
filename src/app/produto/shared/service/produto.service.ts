import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';

import { Produto } from '../model/produto.model';
import { ProdutoFORM } from '../model/produto.form';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/produto`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public buscarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.baseUrl);
  }

  public cadastrarProduto(formularioProduto: ProdutoFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioProduto);
  }

  public alterarDadosProduto(id: number, formularioAlteracaoProduto): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar/${id}`, formularioAlteracaoProduto);
  }

  public excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }
}
