import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { Despesa } from '../model/despesa.model';
import { DespesaFORM } from '../model/despesa.form';
import { AlteracaoDespesaFORM } from '../model/alteracao-despesa.form';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/despesa`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public listarDespesas(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(this.baseUrl);
  }

  public cadastrarDespesa(formularioDespesa: DespesaFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioDespesa);
  }

  public alterarDespesa(id: number, formularioAlteracaoDespesa: AlteracaoDespesaFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar/${id}`, formularioAlteracaoDespesa);
  }

  public confirmarPagamentoDespesa(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/confirmar-pagamento/${id}`, null);
  }

  public excluirDespesa(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }
}
