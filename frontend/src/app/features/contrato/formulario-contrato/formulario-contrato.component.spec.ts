import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContratoComponent } from './formulario-contrato.component';

describe('FormularioContratoComponent', () => {
  let component: FormularioContratoComponent;
  let fixture: ComponentFixture<FormularioContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioContratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
