import { APP_BASE_HREF } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { NgReduxModule } from '@angular-redux/store';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';

import * as routeStubs from '../test/helpers/activated-route-stub';
import { of } from 'rxjs/index';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';
import { RoutePartsService } from './shared/services/route-parts.service';
import { ThemeService } from './shared/services/theme.service';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxModule,
        NgReduxTestingModule,
        RouterTestingModule,
        AppModule
      ],
      declarations: [],
      providers: [
        RoutePartsService,
        ThemeService,
        {provide: APP_BASE_HREF, useValue : '/' },
        {provide: Router, useClass: routeStubs.MockRouter},
        {provide: ActivatedRoute, useValue: {
          data: of(
            {
              title: 'Zippy Crowd'
            }
          ),
          firstChild: {
            url: of([]),
            outlet: 'primary',
            data: of(
              {
                title: 'Zippy Crowd'
              }
            ),
            params: of({
              snapshot: {
                data: {
                  title: 'myTitle'
                }
              },
              routeConfig: {
                children: {
                  filter: () => {}
                }
              },
              outlet: 'primary',
              value: 'testValue',
            })
          }
        }}
      ]
    }).compileComponents();

    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'zippycrowd'`, () => {
    expect(component.appTitle).toEqual(environment.appName);
  });
});
