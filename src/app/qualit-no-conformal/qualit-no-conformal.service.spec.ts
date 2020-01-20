import { TestBed } from '@angular/core/testing';

import { QualitNoConformalService } from './qualit-no-conformal.service';

describe('QualitNoConformalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualitNoConformalService = TestBed.get(QualitNoConformalService);
    expect(service).toBeTruthy();
  });
});
