import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TermsPageComponent } from './terms-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';

const routes: Routes = [
  { path: '',  component: TermsPageComponent, data: { title: PageTitle.terms }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class TermsPageRoutingModule { }
