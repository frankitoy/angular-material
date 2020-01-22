import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrowdPageComponent } from './crowd-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';


const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: CrowdPageComponent,
    data: {
      title: PageTitle.crowd
    },
    children: [
      {
        path: '',
        component: CrowdPageComponent
      },
      {
        path: '**',
        redirectTo: 'crowd'
      }
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class CrowdPageRoutingModule { }
