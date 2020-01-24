import { TestBed } from '@angular/core/testing';

import { ManageModelService } from './manage-models.service';

describe('ManageModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageModelService = TestBed.get(ManageModelService);
    expect(service).toBeTruthy();
  });
});
