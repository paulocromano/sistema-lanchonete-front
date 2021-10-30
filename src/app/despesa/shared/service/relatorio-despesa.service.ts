import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioDespesaService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/relatorio-despesa`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public gerarRelatorioTodasDespesas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/todas-despesas`, {responseType: 'blob' as 'json'});
  }

  public gerarRelatorioDespesasPagas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/despesas-pagas`, {responseType: 'blob' as 'json'});
  }

  public gerarRelatorioDespesasVencidas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/despesas-vencidas`, {responseType: 'blob' as 'json'});
  }
}
