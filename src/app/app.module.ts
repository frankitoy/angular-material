import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { GestureConfig, MatIconModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';

import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { ApplicationActions } from './actions/application.actions';
import { SessionActions } from './actions/session.actions';
import { CrowdActions } from './actions/crowd.actions';

import { IAppState, INITIAL_STATE, rootReducer } from './store/store';

import { apiConstants } from './shared/constants/api.constant';
import { AuthenticationService } from './shared/services/authentication.service';
import { authServiceConfig } from './shared/config/auth-service.config';
import { RoutePartsService } from './shared/services/route-parts.service';
import { ThemeService } from './shared/services/theme.service';
import { CustomIconService } from './shared/services/custom-icon.service';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    GooglePlaceModule,
    HttpClientModule,
    MatIconModule,
    NgReduxModule,
    RouterModule,
    SocialLoginModule,
    SharedModule
  ],
  providers : [
    ApplicationActions,
    AuthenticationService,
    RoutePartsService,
    ThemeService,
    SessionActions,
    CrowdActions,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    {
      provide: apiConstants.config.professionUrl,
      useValue: environment.s3bucketUrl
    },
    {
      provide: AuthServiceConfig,
      useFactory: authServiceConfig
    },
    CustomIconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, devToolsExtension: DevToolsExtension, customIconService: CustomIconService) {
    const enhancers = [];

    if (!environment.production && devToolsExtension.isEnabled()) {
      enhancers.push(devToolsExtension.enhancer());
    }

    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);

    customIconService.init();
  }
}
