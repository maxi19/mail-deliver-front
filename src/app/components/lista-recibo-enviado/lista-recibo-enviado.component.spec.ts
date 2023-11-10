import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReciboEnviadoComponent } from './lista-recibo-enviado.component';

describe('ListaReciboEnviadoComponent', () => {
  let component: ListaReciboEnviadoComponent;
  let fixture: ComponentFixture<ListaReciboEnviadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaReciboEnviadoComponent]
    });
    fixture = TestBed.createComponent(ListaReciboEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
