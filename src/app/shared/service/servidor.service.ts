import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  private urlServidorBackEnd: string = 'http://localhost:8080';

  constructor() { }


  public getUrlServidorBackEnd(): string {
    return this.urlServidorBackEnd;
  }
}
