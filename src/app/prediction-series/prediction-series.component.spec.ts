import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionSeriesComponent } from './prediction-series.component';

describe('PredictionSeriesComponent', () => {
  let component: PredictionSeriesComponent;
  let fixture: ComponentFixture<PredictionSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
