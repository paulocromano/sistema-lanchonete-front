import { TestBed } from '@angular/core/testing';

import { PedidoBebidaService } from './pedido-bebida.service';

describe('PedidoBebidaService', () => {
  let service: PedidoBebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoBebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
