import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Colaborador } from './../model/colaborador.model';
import { ColaboradorFORM } from './../model/colaborador.form';
import { AtualizacaoUsuarioFORM } from './../model/atualizacao-usuario.form';
import { AlteracaoSenhaFORM } from './../model/alteracao-senha.form';
import { ServidorService } from 'src/app/shared/service/servidor.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private readonly baseUrl: string = `${this.servidorService.urlServidorBackEnd}/usuario`;

  constructor(private http: HttpClient, private servidorService: ServidorService) { }


  public listarUsuariosEmOrdemAlfabetica(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.baseUrl);
  }

  public buscarInformacoesUsuario(): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.baseUrl}/informacoes-usuario-logado`);
  }

  public cadastrarUsuario(formularioFuncionario: ColaboradorFORM): Observable<any> {
    return this.http.post(`${this.baseUrl}`, formularioFuncionario);
  }

  public atualizarUsuario(formularioFuncionario: AtualizacaoUsuarioFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}`, formularioFuncionario);
  }

  public alterarSenha(formularioAlteracaoSenha: AlteracaoSenhaFORM): Observable<any> {
    return this.http.put(`${this.baseUrl}/alterar-senha`, formularioAlteracaoSenha);
  }

  public removerUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
