import { TestBed } from '@angular/core/testing';

import { QuantitNoConformalService } from './quantit-no-conformal.service';

describe('QuantitNoConformalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantitNoConformalService = TestBed.get(QuantitNoConformalService);
    expect(service).toBeTruthy();
  });
});
