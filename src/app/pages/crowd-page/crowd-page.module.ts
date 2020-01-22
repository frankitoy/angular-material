import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatSlideToggleModule, MatAutocompleteModule, MatButtonModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule} from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';
import { CrowdPageRoutingModule } from './crowd-page-routing.module';
import { CrowdPageComponent } from './crowd-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    CrowdPageRoutingModule,
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
  ],
  providers: [
  ],
  declarations: [
    CrowdPageComponent,
  ],
  exports: [
    CrowdPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CrowdPageModule { }
