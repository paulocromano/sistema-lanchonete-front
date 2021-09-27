import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { Endereco } from '../model/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/endereco`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public buscarEnderecoPeloCEP(cep: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/api-via-cep/${cep}`);
  }
}
