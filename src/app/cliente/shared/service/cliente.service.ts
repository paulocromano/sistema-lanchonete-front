import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { ClienteFORM } from '../model/cliente.form';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/cliente`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  public cadastrarCliente(formularioCliente: ClienteFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioCliente);
  }

  public excluirCliente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
