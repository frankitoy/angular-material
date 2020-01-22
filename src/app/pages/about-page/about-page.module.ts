import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';

import { AboutPageRoutingModule } from './about-page-routing.module';
import { AboutPageComponent } from './about-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    AboutPageRoutingModule
  ],
  declarations: [
    AboutPageComponent
  ],
  exports: [
    AboutPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutPageModule { }
