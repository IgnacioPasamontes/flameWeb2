import { TestBed } from '@angular/core/testing';

import { PredictorService } from './predictor.service';

describe('PredictorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PredictorService = TestBed.get(PredictorService);
    expect(service).toBeTruthy();
  });
});
