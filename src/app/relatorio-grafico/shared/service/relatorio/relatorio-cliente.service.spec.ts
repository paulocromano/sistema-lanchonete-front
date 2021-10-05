import { TestBed } from '@angular/core/testing';

import { RelatorioClienteService } from './relatorio-cliente.service';

describe('RelatorioClienteService', () => {
  let service: RelatorioClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
