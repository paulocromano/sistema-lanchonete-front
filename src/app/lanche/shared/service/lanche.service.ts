import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ServidorService } from 'src/app/shared/service/servidor.service';
import { Lanche } from '../model/lanche.model';
import { ImagemLancheBase64 } from '../model/imagem-lanche-base-64.model';
import { LancheFORM } from '../model/lanche.form';

@Injectable({
  providedIn: 'root'
})
export class LancheService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/lanche`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }

  public listarLanches(): Observable<Lanche[]> {
    return this.http.get<Lanche[]>(this.baseUrl);
  }

  public encodeImagemLancheParaBase64(imagem: File): Observable<ImagemLancheBase64> {
    const formData: FormData = new FormData();
    formData.append('imagem', imagem);

    return this.http.post<ImagemLancheBase64>(`${this.baseUrl}/encode-imagem-lanche`, formData);
  }

  public cadastrarLanche(formularioLanche: LancheFORM): Observable<any> {
    return this.http.post(this.baseUrl, formularioLanche);
  }

  public alterarDadosLanche(id: number, formularioLanche: LancheFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar/${id}`, formularioLanche);
  }

  public excluirLanche(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/excluir/${id}`);
  }
}
