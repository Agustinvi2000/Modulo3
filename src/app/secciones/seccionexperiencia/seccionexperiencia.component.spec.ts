import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionexperienciaComponent } from './seccionexperiencia.component';

describe('SeccionexperienciaComponent', () => {
  let component: SeccionexperienciaComponent;
  let fixture: ComponentFixture<SeccionexperienciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionexperienciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionexperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
