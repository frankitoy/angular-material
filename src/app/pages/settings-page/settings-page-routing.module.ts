import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPageComponent } from './settings-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';


const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: SettingsPageComponent,
    data: {
      title: PageTitle.settings
    },
    children: [
      {
        path: '',
        component: SettingsPageComponent
      },
      {
        path: '**',
        redirectTo: 'settings'
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
export class SettingsPageRoutingModule { }
