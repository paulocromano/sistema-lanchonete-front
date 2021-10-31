import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  public readonly regraAcessoFuncionario: string = 'ROLE_FUNCIONARIO';
  public readonly regraAcessoAdmin: string = 'ROLE_ADMIN';
  public readonly urlServidorBackEnd: string = 'http://localhost:8080';
  public readonly urlFrontAcessoNegado: string =  'http://127.0.0.1:4200/login';

  constructor() { }

}
