import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionRecibosComponent } from './accordion-recibos.component';

describe('AccordionRecibosComponent', () => {
  let component: AccordionRecibosComponent;
  let fixture: ComponentFixture<AccordionRecibosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionRecibosComponent]
    });
    fixture = TestBed.createComponent(AccordionRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
