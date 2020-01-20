import { TestBed } from '@angular/core/testing';

import { QualitConformalService } from './qualit-conformal.service';

describe('QualitConformalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualitConformalService = TestBed.get(QualitConformalService);
    expect(service).toBeTruthy();
  });
});
