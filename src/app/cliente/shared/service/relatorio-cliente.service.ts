import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioClienteService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/relatorio-cliente`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public gerarRelatorioComTodosClientes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/todos-clientes`, {responseType: 'blob' as 'json'});
  }

  public gerarRelatorioDeClientesCadastradosEntrePeriodos(dataInicial: string, dataFinal: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/cadastrados-entre-periodo?dataInicial=${dataInicial}&dataFinal=${dataFinal}`, 
      {responseType: 'blob' as 'json'});
  }
}
