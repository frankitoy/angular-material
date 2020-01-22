import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageTitle } from '../../shared/constants/page-title.constant';

import { AskFriendsPageComponent } from './ask-friends-page.component';
import { AskFriendsPageResolver } from './ask-friends-page.resolver';

const routes: Routes = [
  { path: '', component: AskFriendsPageComponent, data: { title: PageTitle.askFriends }},
  {
    path: 'ask/:postId',
    component: AskFriendsPageComponent,
    data: { title: PageTitle.askFriends },
    resolve: {
      askInfo: AskFriendsPageResolver
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AskFriendsPageRoutingModule { }
