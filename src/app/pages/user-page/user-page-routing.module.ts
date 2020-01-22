import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { UserPageComponent } from './user-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    children: [
      {
        path: 'ask/:id',
        loadChildren: '../ask-page/ask-page.module#AskPageModule',
        data: { title: PageTitle.ask, breadcrumb: 'ASK' }
      },
      {
        path: 'skill/:skillId',
        loadChildren: '../skill-page/skill-page.module#SkillPageModule',
        data: { title: PageTitle.skill, breadcrumb: 'SKILL' }
      },
      {
        path: '',
        loadChildren: '../profile-page/profile-page.module#ProfilePageModule',
        data: { title: PageTitle.profile, breadcrumb: 'PROFILE' }
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
export class UserPageRoutingModule { }
