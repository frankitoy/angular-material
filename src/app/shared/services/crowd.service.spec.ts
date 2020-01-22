import { TestBed } from '@angular/core/testing';

import { CrowdService } from './crowd.service';

describe('CrowdService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CrowdService
      ]
    });
  });

  it('should be created', () => {
    const service: CrowdService = TestBed.get(CrowdService);
    expect(service).toBeTruthy();
  });
});
