import { TestBed } from '@angular/core/testing';

import { RelatorioPedidoService } from './relatorio-pedido.service';

describe('RelatorioPedidoService', () => {
  let service: RelatorioPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
