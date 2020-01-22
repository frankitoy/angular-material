import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AskPageComponent } from './ask-page.component';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { AuthGuardService } from '../../shared/services/guard/auth-guard.service';

const routes: Routes = [
  { path: '', canActivate: [], component: AskPageComponent, data: { title: PageTitle.ask }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AskPageRoutingModule { }
