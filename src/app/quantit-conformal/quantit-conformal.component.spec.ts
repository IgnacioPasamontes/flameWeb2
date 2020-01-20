import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantitConformalComponent } from './quantit-conformal.component';

describe('QuantitConformalComponent', () => {
  let component: QuantitConformalComponent;
  let fixture: ComponentFixture<QuantitConformalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantitConformalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantitConformalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
