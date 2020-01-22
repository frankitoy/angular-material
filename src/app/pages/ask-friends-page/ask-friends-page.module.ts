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
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatStepperModule,
  MatToolbarModule,
  MatTabsModule
} from '@angular/material';

import { ShareButtonsModule } from '@ngx-share/buttons';

import { TagInputModule } from 'ngx-chips';

import { SharedModule } from '../../shared/shared.module';

import { AskFriendsPageRoutingModule } from './ask-friends-page-routing.module';

import { AskActions } from '../../actions/ask.actions';
import { AskFormActions } from '../../actions/ask-form.actions';
import { CrowdActions } from '../../actions/crowd.actions';
import { ProfessionActions } from '../../actions/profession.actions';

import { AskFriendsPageComponent } from './ask-friends-page.component';
import { AskFriendsPageResolver } from './ask-friends-page.resolver';
import { UserActions } from '../../actions/user.actions';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    AskFriendsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ShareButtonsModule,
    TagInputModule
  ],
  providers: [
    AskActions,
    AskFormActions,
    ProfessionActions,
    AskFriendsPageResolver,
    CrowdActions,
    UserActions
  ],
  declarations: [
    AskFriendsPageComponent
  ],
  exports: [
    AskFriendsPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AskFriendsPageModule { }
