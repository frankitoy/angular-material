import { TestBed } from '@angular/core/testing';

import { AskService } from './ask.service';

describe('AskService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AskService
      ]
    });
  });

  it('should be created', () => {
    const service: AskService = TestBed.get(AskService);
    expect(service).toBeTruthy();
  });
});
