import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSliderModule,
  MatToolbarModule
} from '@angular/material';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { NgCircleProgressModule } from 'ng-circle-progress';

import { WelcomePageRoutingModule } from './welcome-page-routing.module';
import { WelcomePageComponent } from './welcome-page.component';
import { SharedModule } from '../../shared/shared.module';

import { UserActions } from '../../actions/user.actions';
import { CrowdActions } from '../../actions/crowd.actions';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    SharedModule,
    GooglePlaceModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300
    }),
    WelcomePageRoutingModule
  ],
  providers: [
    CrowdActions
  ],
  declarations: [
    WelcomePageComponent
  ],
  exports: [
    WelcomePageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WelcomePageModule { }
