import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionhabilidadesComponent } from './seccionhabilidades.component';

describe('SeccionhabilidadesComponent', () => {
  let component: SeccionhabilidadesComponent;
  let fixture: ComponentFixture<SeccionhabilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeccionhabilidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeccionhabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
