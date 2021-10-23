import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { Mesa } from '../model/mesa.model';
import { MesaFORM } from '../model/mesa.form';
import { AlteracaoMesaFORM } from '../model/alteracao-mesa.form';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/mesa`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public buscarMesas(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(this.baseUrl);
  }

  public buscarMesasDisponiveis(): Observable<Mesa[]> {
    return this.http.get<Mesa[]>(`${this.baseUrl}/disponivel`);
  }

  public cadastrarMesa(formularioMesa: MesaFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioMesa);
  }

  public alterarDadosMesa(id: number, formularioMesa: AlteracaoMesaFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar/${id}`, formularioMesa)
  }

  public excluirMesa(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }
}
