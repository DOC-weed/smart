import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazadoComponent } from './rechazado.component';

describe('RechazadoComponent', () => {
  let component: RechazadoComponent;
  let fixture: ComponentFixture<RechazadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
