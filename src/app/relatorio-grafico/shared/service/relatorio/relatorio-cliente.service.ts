import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioClienteService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/relatorio-cliente`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }
}
