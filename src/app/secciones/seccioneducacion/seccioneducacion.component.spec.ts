import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccioneducacionComponent } from './seccioneducacion.component';

describe('SeccioneducacionComponent', () => {
  let component: SeccioneducacionComponent;
  let fixture: ComponentFixture<SeccioneducacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccioneducacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccioneducacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
