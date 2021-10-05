import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioGraficoComponent } from './relatorio-grafico.component';

describe('RelatorioGraficoComponent', () => {
  let component: RelatorioGraficoComponent;
  let fixture: ComponentFixture<RelatorioGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
