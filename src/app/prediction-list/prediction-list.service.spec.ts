import { TestBed } from '@angular/core/testing';

import { PredictionListService } from './prediction-list.service';

describe('PredictionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PredictionListService = TestBed.get(PredictionListService);
    expect(service).toBeTruthy();
  });
});
