import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { TermsPageRoutingModule } from './terms-page-routing.module';
import { TermsPageComponent } from './terms-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    TermsPageRoutingModule
  ],
  declarations: [
    TermsPageComponent
  ],
  exports: [
    TermsPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TermsPageModule { }
