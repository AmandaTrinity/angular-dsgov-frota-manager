import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalheComponent } from './consulta-detalhe';

describe('ConsultaDetalhe', () => {
  let component: ConsultaDetalheComponent;
  let fixture: ComponentFixture<ConsultaDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaDetalheComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
