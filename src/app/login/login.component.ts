import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { CredenciaisUsuario } from './shared/model/credenciais-usuario.model';
import { AuthenticationService } from './../shared/service/authentication.service';
import { TokenService } from './../shared/service/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public credenciaisUsuario: CredenciaisUsuario = new CredenciaisUsuario();
  public processandoOperacao: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    if (!this.tokenService.isTokenInvalido()) {
      this.router.navigate(['inicio']);
    }
  }

  public efetuarLogin(): void {
    this.processandoOperacao = true;

    this.authenticationService.autenticarUsuario(this.credenciaisUsuario)
      .subscribe((response: any) => {
        localStorage.clear();
        this.tokenService.armazenarToken(response);
        this.credenciaisUsuario = new CredenciaisUsuario();
        this.processandoOperacao = false
        this.router.navigate(['inicio']);
      },
        (error: HttpErrorResponse) => {
          this.processandoOperacao = false;

          if (error.status === 401) {
            this.toastrService.error('Email ou senha inválidos!');
          }
          else {
            this.toastrService.error('Erro ao efetuar o login!');
          }
        }
      );
  }

  public desabilitarBotaoEntrar(): boolean {
    return !(this.credenciaisUsuario.email && this.credenciaisUsuario.senha) 
      || this.credenciaisUsuario.senha.length < 6 || this.credenciaisUsuario.senha.length > 20; 
  }
}
