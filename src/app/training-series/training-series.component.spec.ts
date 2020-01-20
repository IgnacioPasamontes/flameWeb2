import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingSeriesComponent } from './training-series.component';

describe('TrainingSeriesComponent', () => {
  let component: TrainingSeriesComponent;
  let fixture: ComponentFixture<TrainingSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
