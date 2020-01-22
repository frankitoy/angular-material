import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillPageComponent } from './skill-page.component';
import { PageTitle } from 'app/shared/constants/page-title.constant';

const routes: Routes = [
  { path: '', canActivate: [], component: SkillPageComponent, data: { title: PageTitle.skill }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillPageRoutingModule { }
