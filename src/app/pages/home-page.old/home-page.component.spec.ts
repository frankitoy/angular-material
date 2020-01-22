import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgReduxModule } from '@angular-redux/store';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';

import { MatDialog } from '@angular/material';

import { AuthService } from 'angularx-social-login';

import * as servicesStubs from '../../../test/helpers/services-stub';

import { HomePageComponent } from './home-page.component';
import { HomePageModule } from './home-page.module';

describe('HomePageComponent', () => {

  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgReduxModule,
        NgReduxTestingModule,
        RouterTestingModule,
        HomePageModule
      ],
      providers: [
        {
          provide: MatDialog,
          useClass: servicesStubs.MockMatDialog
        },
        {
          provide: AuthService,
          useClass: servicesStubs.MockAuthService
        }
      ]
    }).compileComponents();

    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
