import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptadoComponent } from './aceptado.component';

describe('AceptadoComponent', () => {
  let component: AceptadoComponent;
  let fixture: ComponentFixture<AceptadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AceptadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
