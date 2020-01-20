import { TestBed } from '@angular/core/testing';

import { QuantitConformalService } from './quantit-conformal.service';

describe('QuantitConformalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantitConformalService = TestBed.get(QuantitConformalService);
    expect(service).toBeTruthy();
  });
});
