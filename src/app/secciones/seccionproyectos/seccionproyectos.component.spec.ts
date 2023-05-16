import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionproyectosComponent } from './seccionproyectos.component';

describe('SeccionproyectosComponent', () => {
  let component: SeccionproyectosComponent;
  let fixture: ComponentFixture<SeccionproyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionproyectosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionproyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
