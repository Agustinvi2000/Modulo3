import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionacercadeComponent } from './seccionacercade.component';

describe('SeccionacercadeComponent', () => {
  let component: SeccionacercadeComponent;
  let fixture: ComponentFixture<SeccionacercadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionacercadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionacercadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
