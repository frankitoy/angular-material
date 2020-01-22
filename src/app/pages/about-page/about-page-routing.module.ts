import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './about-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';

const routes: Routes = [
  { path: '',  component: AboutPageComponent, data: { title: PageTitle.about }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AboutPageRoutingModule { }
