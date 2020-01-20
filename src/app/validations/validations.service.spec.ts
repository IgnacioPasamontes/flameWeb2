import { TestBed } from '@angular/core/testing';

import { ValidationsService } from './validations.service';

describe('ValidationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationsService = TestBed.get(ValidationsService);
    expect(service).toBeTruthy();
  });
});
