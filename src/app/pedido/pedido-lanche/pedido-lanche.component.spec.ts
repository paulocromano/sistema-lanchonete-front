import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoLancheComponent } from './pedido-lanche.component';

describe('PedidoLancheComponent', () => {
  let component: PedidoLancheComponent;
  let fixture: ComponentFixture<PedidoLancheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoLancheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoLancheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
