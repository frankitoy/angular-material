import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePageComponent } from './profile-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { AsksComponent } from './components/asks/asks.component';
import { RecsComponent } from './components/recs/recs.component';
import { CrowdComponent } from './components/crowd/crowd.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: ProfilePageComponent,
    data: {
      title: PageTitle.profile
    },
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full',
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      },
      {
        path: 'asks',
        component: AsksComponent
      },
      {
        path: 'recs',
        component: RecsComponent
      },
      {
        path: 'crowd',
        component: CrowdComponent
      },
      {
        path: '**',
        redirectTo: 'about'
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
export class ProfilePageRoutingModule { }
