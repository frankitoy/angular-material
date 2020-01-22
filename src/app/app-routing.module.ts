import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { PageTitle } from './shared/constants/page-title.constant';
import { AuthGuardService } from './shared/services/guard/auth-guard.service';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home-page/home-page.module#HomePageModule',
    data: { title: PageTitle.home }
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: './pages/welcome-page/welcome-page.module#WelcomePageModule',
        data: { title: PageTitle.welcome, breadcrumb: 'WELCOME' }
      },
      {
        path: 'ask-details',
        loadChildren: './pages/ask-details-page/ask-details-page.module#AskDetailsPageModule',
        data: { title: PageTitle.askDetails, breadcrumb: 'ASK DETAILS' }
      },
      {
        path: 'send-profile-name',
        loadChildren: './pages/ask-friends-page/ask-friends-page.module#AskFriendsPageModule',
        data: { title: PageTitle.askFriends, breadcrumb: 'ASK FRIENDS' }
      },
      {
        path: 'dashboard',
        loadChildren: './pages/dashboard-page/dashboard-page.module#DashboardPageModule',
        data: { title: PageTitle.dashboard, breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'profile',
        loadChildren: './pages/profile-page/profile-page.module#ProfilePageModule',
        data: { title: PageTitle.profile, breadcrumb: 'PROFILE' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'user/:id',
        loadChildren: './pages/user-page/user-page.module#UserPageModule',
        data: { title: PageTitle.profile, breadcrumb: 'PROFILE' }
      },
      {
        path: 'settings',
        loadChildren: './pages/settings-page/settings-page.module#SettingsPageModule',
        data: { title: PageTitle.settings, breadcrumb: 'SETTINGS' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'crowdfeed',
        loadChildren: './pages/crowd-page/crowd-page.module#CrowdPageModule',
        data: { title: PageTitle.crowd, breadcrumb: 'CROWDFEED' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'search',
        component: SearchPageComponent,
        data: { title: PageTitle.search, breadcrumb: 'Search' },
        canActivate: [AuthGuardService]
      },
      {
        path: 'terms',
        loadChildren: './pages/terms-page/terms-page.module#TermsPageModule',
        data: { title: PageTitle.terms, breadcrumb: 'TERMS' }
      },
      {
        path: 'privacy',
        loadChildren: './pages/privacy-page/privacy-page.module#PrivacyPageModule',
        data: { title: PageTitle.privacy, breadcrumb: 'PRIVACY' }
      },
      {
        path: 'about',
        loadChildren: './pages/about-page/about-page.module#AboutPageModule',
        data: { title: PageTitle.privacy, breadcrumb: 'ABOUT' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


