import { TestBed } from '@angular/core/testing';

import { RelatorioProdutoService } from './relatorio-produto.service';

describe('RelatorioProdutoService', () => {
  let service: RelatorioProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
