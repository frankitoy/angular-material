import { Router } from '@angular/router';
import { inject, TestBed } from '@angular/core/testing';

import { LayoutService } from './layout.service';

import * as routeStubs from '../../../test/helpers/activated-route-stub';

describe('LayoutService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LayoutService,
        {provide: Router, useClass: routeStubs.MockRouter}
      ]
    });
  });

  it('should be created', inject([LayoutService], (service: LayoutService) => {
    expect(service).toBeTruthy();
  }));
});
