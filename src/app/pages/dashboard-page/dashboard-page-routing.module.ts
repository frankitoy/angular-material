import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { AuthGuardService } from '../../shared/services/guard/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: DashboardPageComponent, data: { title: PageTitle.askDetails }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class DashboardPageRoutingModule { }
