import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTrabajoComponent } from './agregar-trabajo.component';

describe('AgregarTrabajoComponent', () => {
  let component: AgregarTrabajoComponent;
  let fixture: ComponentFixture<AgregarTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTrabajoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
