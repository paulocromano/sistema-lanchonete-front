import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { FornecedorFORM } from '../model/fornecedor.form';
import { Fornecedor } from '../model/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/fornecedor`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public listarFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.baseUrl);
  }

  public cadastrarFornecedor(formularioFornecedor: FornecedorFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioFornecedor);
  }

  public alterarDadosFornecedor(id: number, formularioFornecedor: FornecedorFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar/${id}`, formularioFornecedor);
  }

  public excluirFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }
}
