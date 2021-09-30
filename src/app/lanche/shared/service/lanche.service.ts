import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { Lanche } from '../model/lanche.model';

@Injectable({
  providedIn: 'root'
})
export class LancheService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/lanche`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public listarLanches(): Observable<Lanche[]> {
    return this.http.get<Lanche[]>(this.baseUrl);
  }

  public encodeImagemLancheParaBase64(imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('imagem', imagem);

    return this.http.post<any>(`${this.baseUrl}/encode-imagem-lanche`, formData);
  }
}
