import { TestBed } from '@angular/core/testing';

import { ModelListService } from './model-list.service';

describe('ModelListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelListService = TestBed.get(ModelListService);
    expect(service).toBeTruthy();
  });
});
