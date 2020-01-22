import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import * as routeStubs from '../../../../test/helpers/activated-route-stub';
import { LoginGuardService } from './login-guard.service';

describe('LoginGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: routeStubs.MockRouter},
        LoginGuardService
      ]
    });
  });

  it('should be created', () => {
    const service: LoginGuardService = TestBed.get(LoginGuardService);
    expect(service).toBeTruthy();
  });
});
