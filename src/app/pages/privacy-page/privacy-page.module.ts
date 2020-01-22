import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { PrivacyPageRoutingModule } from './privacy-page-routing.module';
import { PrivacyPageComponent } from './privacy-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    PrivacyPageRoutingModule
  ],
  declarations: [
    PrivacyPageComponent
  ],
  exports: [
    PrivacyPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrivacyPageModule { }
