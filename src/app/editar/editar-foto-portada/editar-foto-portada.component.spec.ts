import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFotoPortadaComponent } from './editar-foto-portada.component';

describe('EditarFotoPortadaComponent', () => {
  let component: EditarFotoPortadaComponent;
  let fixture: ComponentFixture<EditarFotoPortadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFotoPortadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFotoPortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
