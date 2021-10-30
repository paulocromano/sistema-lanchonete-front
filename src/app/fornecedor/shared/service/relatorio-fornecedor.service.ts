import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioFornecedorService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/relatorio-fornecedor`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public gerarRelatorioComTodosFornecedores(): Observable<any> {
    return this.http.get(`${this.baseUrl}/todos-fornecedores`, {responseType: 'blob' as 'json'});
  }
}
