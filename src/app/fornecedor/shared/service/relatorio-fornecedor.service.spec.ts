import { TestBed } from '@angular/core/testing';

import { RelatorioFornecedorService } from './relatorio-fornecedor.service';

describe('RelatorioFornecedorService', () => {
  let service: RelatorioFornecedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioFornecedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
