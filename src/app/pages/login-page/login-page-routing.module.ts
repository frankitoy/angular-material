import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { LoginGuardService } from '../../shared/services/guard/login-guard.service';

const routes: Routes = [
  { path: '', canActivate: [LoginGuardService], component: LoginPageComponent, data: { title: PageTitle.login }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class LoginPageRoutingModule { }
