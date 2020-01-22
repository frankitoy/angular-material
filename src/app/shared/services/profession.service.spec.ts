import { inject, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { apiConstants } from '../constants/api.constant';

import { ProfessionService } from './profession.service';

describe('ProfessionService', () => {

  const s3bucketUrl = 'http://s3Url/v1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: apiConstants.config.professionUrl,
          useValue: s3bucketUrl
        },
        ProfessionService
      ]
    });
  });

  it('should be created', inject([ProfessionService], (service: ProfessionService) => {
    expect(service).toBeTruthy();
  }));
});
