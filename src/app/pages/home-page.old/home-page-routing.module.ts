import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { title: PageTitle.home }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HomePageRoutingModule { }
