import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioArchivosComponent } from './envio-archivos.component';

describe('EnvioArchivosComponent', () => {
  let component: EnvioArchivosComponent;
  let fixture: ComponentFixture<EnvioArchivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnvioArchivosComponent]
    });
    fixture = TestBed.createComponent(EnvioArchivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
