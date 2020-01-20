import { TestBed } from '@angular/core/testing';

import { TrainingSeriesService } from './training-series.service';

describe('TrainingSeriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainingSeriesService = TestBed.get(TrainingSeriesService);
    expect(service).toBeTruthy();
  });
});
