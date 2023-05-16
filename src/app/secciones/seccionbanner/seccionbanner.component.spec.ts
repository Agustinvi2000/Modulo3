import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionbannerComponent } from './seccionbanner.component';

describe('SeccionbannerComponent', () => {
  let component: SeccionbannerComponent;
  let fixture: ComponentFixture<SeccionbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionbannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
