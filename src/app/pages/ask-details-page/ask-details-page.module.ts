import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatFormFieldModule,
  MatIconModule,
  MatSidenavModule,
  MatSliderModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material';

import { ShareButtonsModule } from '@ngx-share/buttons';

import { SharedModule } from '../../shared/shared.module';

import { AskDetailsPageRoutingModule } from './ask-details-page-routing.module';

import { AskActions } from '../../actions/ask.actions';
import { AskFormActions } from '../../actions/ask-form.actions';
import { ProfessionActions } from '../../actions/profession.actions';

import { AskDetailsPageComponent } from './ask-details-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatToolbarModule,
    MatStepperModule,
    AskDetailsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ShareButtonsModule
  ],
  providers: [
    AskActions,
    AskFormActions,
    ProfessionActions
  ],
  declarations: [
    AskDetailsPageComponent
  ],
  exports: [
    AskDetailsPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AskDetailsPageModule { }
