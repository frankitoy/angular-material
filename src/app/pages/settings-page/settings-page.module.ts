import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatSlideToggleModule, MatAutocompleteModule, MatButtonModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsPageComponent } from './settings-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    SettingsPageRoutingModule,
    SharedModule,
    ChartsModule,
    MatButtonModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    GooglePlaceModule
  ],
  providers: [
  ],
  declarations: [
    SettingsPageComponent,
    SidenavComponent,
    ContactDetailsComponent,
    NotificationsComponent,
    SocialNetworksComponent,
    AccountSettingsComponent,
  ],
  exports: [
    SettingsPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsPageModule { }
