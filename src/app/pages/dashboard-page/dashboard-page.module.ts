import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule} from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
// import { MatBadgeModule } from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    DashboardPageRoutingModule,
    SharedModule,
    ChartsModule,
    MatButtonModule,
    MatTabsModule,
    // MatBadgeModule,
    MatListModule
  ],
  providers: [
    // ProfessionActions
  ],
  declarations: [
    DashboardPageComponent
  ],
  exports: [
    DashboardPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardPageModule { }
