import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivacyPageComponent } from './privacy-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';

const routes: Routes = [
  { path: '',  component: PrivacyPageComponent, data: { title: PageTitle.privacy }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PrivacyPageRoutingModule { }
