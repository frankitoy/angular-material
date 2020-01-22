import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { AuthGuardService } from '../../shared/services/guard/auth-guard.service';

import { AskDetailsPageComponent } from './ask-details-page.component';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], component: AskDetailsPageComponent, data: { title: PageTitle.askDetails }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AskDetailsPageRoutingModule { }
