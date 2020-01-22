import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatSidenavModule,
  MatSliderModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material';

import { SharedModule } from '../../shared/shared.module';

import { HomePageRoutingModule } from './home-page-routing.module';

import { AskFormActions } from '../../actions/ask-form.actions';
import { ProfessionActions } from '../../actions/profession.actions';

import { HomePageComponent } from './home-page.component';
// import { HeaderTopComponent } from './shared/components/header-top/header-top.component';
import { NewToZippyCrowdSectionComponent } from './new-to-zippy-crowd-section/new-to-zippy-crowd-section.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatStepperModule,
    MatToolbarModule,
    HomePageRoutingModule,
    SharedModule
  ],
  providers: [
    AskFormActions,
    ProfessionActions
  ],
  declarations: [
    HomePageComponent,
    NewToZippyCrowdSectionComponent
  ],
  exports: [
    HomePageComponent,
    NewToZippyCrowdSectionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
