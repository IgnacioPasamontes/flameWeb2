import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitNoConformalComponent } from './quantit-no-conformal.component';

describe('QuantitNoConformalComponent', () => {
  let component: QuantitNoConformalComponent;
  let fixture: ComponentFixture<QuantitNoConformalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitNoConformalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitNoConformalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
