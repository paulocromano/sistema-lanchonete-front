import { TestBed } from '@angular/core/testing';

import { PedidoLancheService } from './pedido-lanche.service';

describe('PedidoLancheService', () => {
  let service: PedidoLancheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoLancheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
