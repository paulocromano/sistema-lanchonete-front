import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoBebidaComponent } from './pedido-bebida.component';

describe('PedidoBebidaComponent', () => {
  let component: PedidoBebidaComponent;
  let fixture: ComponentFixture<PedidoBebidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoBebidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
