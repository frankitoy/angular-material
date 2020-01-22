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
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AsksComponent } from './components/asks/asks.component';
import { RecsComponent } from './components/recs/recs.component';
import { CrowdComponent } from './components/crowd/crowd.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ProfilePageRoutingModule,
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
    MatAutocompleteModule
  ],
  providers: [
  ],
  declarations: [
    ProfilePageComponent,
    OverviewComponent,
    AboutComponent,
    SkillsComponent,
    AsksComponent,
    RecsComponent,
    CrowdComponent
  ],
  exports: [
    ProfilePageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePageModule { }
