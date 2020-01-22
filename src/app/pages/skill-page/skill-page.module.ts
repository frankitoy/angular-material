import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillPageRoutingModule } from './skill-page-routing.module';
import { SkillPageComponent } from './skill-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SkillPageComponent],
  imports: [
    CommonModule,
    SkillPageRoutingModule,
    SharedModule
  ],
  exports: [SkillPageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillPageModule { }
