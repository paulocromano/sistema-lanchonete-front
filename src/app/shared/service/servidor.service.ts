import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  public readonly urlServidorBackEnd: string = 'http://localhost:8080';

  constructor() { }

}
