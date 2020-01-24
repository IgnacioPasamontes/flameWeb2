import { TestBed } from '@angular/core/testing';

import { ManagePredictionsService } from './manage-predictions.service';

describe('ManagePredictionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagePredictionsService = TestBed.get(ManagePredictionsService);
    expect(service).toBeTruthy();
  });
});
