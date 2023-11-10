import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPersonalComponent } from './modificar-personal.component';

describe('ModificarPersonalComponent', () => {
  let component: ModificarPersonalComponent;
  let fixture: ComponentFixture<ModificarPersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarPersonalComponent]
    });
    fixture = TestBed.createComponent(ModificarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
