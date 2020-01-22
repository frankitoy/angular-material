import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';

import { LogoutPageComponent } from './logout-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    SharedModule,

  ],
  declarations: [
    LogoutPageComponent
  ],
  exports: [
    LogoutPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogoutPageModule { }
