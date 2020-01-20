import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePredictionsComponent } from './manage-predictions.component';

describe('ManagePredictionsComponent', () => {
  let component: ManagePredictionsComponent;
  let fixture: ComponentFixture<ManagePredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
