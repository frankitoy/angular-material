import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { AuthGuardService } from '../../shared/services/guard/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: WelcomePageComponent, data: { title: PageTitle.welcome }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class WelcomePageRoutingModule { }
