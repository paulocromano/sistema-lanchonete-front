import { TestBed } from '@angular/core/testing';

import { RelatorioDespesaService } from './relatorio-despesa.service';

describe('RelatorioDespesaService', () => {
  let service: RelatorioDespesaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioDespesaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
