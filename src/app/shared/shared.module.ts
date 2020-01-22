import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { BREAKPOINT, FlexLayoutModule } from '@angular/flex-layout';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { ShareButtonsModule } from '@ngx-share/buttons';

import { CookieService } from 'ngx-cookie-service';

import { AuthenticationService } from './services/authentication.service';
import { ChartsModule } from 'ng2-charts';
import {
  GestureConfig,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTooltipModule,
  MatToolbarModule,
  MatStepperModule,
  MatExpansionModule
} from '@angular/material';

import { TagInputModule } from 'ngx-chips';

// services
import { AppLoaderService } from './components/app-loader/app-loader.service';
import { AskService } from './services/ask.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { CrowdService } from './services/crowd.service';
import { LandingPageService } from './services/landing-page.service';
import { LayoutService } from './services/layout.service';
import { ProfessionService } from './services/profession.service';
import { NavigationService } from './services/navigation.service';
import { RoutePartsService } from './services/route-parts.service';
import { ThemeService } from './services/theme.service';
import { WindowService } from './services/window.service';
import { SkillService } from './services/skill.service';
import { ReputationService } from './services/reputation.service';
import { SearchService } from './services/search.service';

// directive
import { AppDropdownDirective } from './directives/dropdown.directive';
import { DropdownAnchorDirective } from './directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './directives/dropdown-link.directive';
import { FontSizeDirective } from './directives/font-size.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { SideNavToggleDirective } from './directives/side-nav-toggle.directive';

// components
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { AskCardComponent } from './components/ask-card/ask-card.component';
import { AskCircularProgressComponent } from './components/ask-circular-progress/ask-circular-progress.component';
import { AppConfirmComponent } from './components/app-confirm/app-confirm.component';
import { AppLoaderComponent } from './components/app-loader/app-loader.component';
import { AskFormComponent } from './components/ask-form/ask-form.component';
import { AskFriendListComponent } from './components/ask-friend-list/ask-friend-list.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { HeaderSideComponent } from './components/header-side/header-side.component';
import { HeaderTopComponent } from './components/header-top/header-top.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { DashboardSideNavComponent } from './components/dashboard-sidenav/dashboard-sidenav.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NonAuthenticatedHeaderTopComponent } from './components/non-authenticated-header-top/non-authenticated-header-top.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component'; // not in use//
import { SidenavComponent } from './components/sidenav/sidenav.component'; // not in use//
import { SidebarSideComponent } from './components/sidebar-side/sidebar-side.component'; // not in use//
import { StepperComponent } from './components/stepper/stepper.component';
import { IntroComponent } from './components/intro/intro.component';
import { SocialShareDialogComponent } from './components/social-share-dialog/social-share-dialog.component';
import { CrowdZipComponent } from './components/crowd-zip/crowd-zip.component';
import { ZcPopupFormComponent } from './components/zc-popup-form/zc-popup-form.component';

import { SkillRecsComponent } from './components/skill-recs/skill-recs.component';
import { CrowdRecsComponent } from './components/crowd-recs/crowd-recs.component';
import { ReputationComponent } from './components/reputation/reputation.component';
import { CrowdComponent } from './components/crowd/crowd.component';
import { SkillCardsComponent } from './components/skill-cards/skill-cards.component';
import { MyAsksComponent } from './components/my-asks/my-asks.component';
import { AskCardHeaderComponent } from './components/ask-card-header/ask-card-header.component';
import { CreateSkillDialogComponent } from './components/create-skill-dialog/create-skill-dialog.component';
import { RecommendationHeaderComponent } from './components/recommendation-header/recommendation-header.component';
import { ShareRecommendationsComponent } from './components/share-recommendations/share-recommendations.component';
import { StatsComponent } from './components/stats/stats.component';
import { CrowdsComponent } from './components/crowds/crowds.component';
import { RecommendedCrowdComponent } from './components/recommended-crowd/recommended-crowd.component';
import { ReccomendationComponent } from './components/reccomendation/reccomendation.component';
import { RecGivenComponent } from './components/rec-given/rec-given.component';

import { CreateAskRecDialogComponent } from './components/create-ask-rec-dialog/create-ask-rec-dialog.component';
import { AskRecSocialDialogComponent } from './components/ask-rec-social-dialog/ask-rec-social-dialog.component';
import { LoginConfirmationDialogComponent } from './components/login-confirmation-dialog/login-confirmation-dialog.component';

import { PrintBreakpoints } from './constants/print-breakpoints.constant';

import { apiConstants } from './constants/api.constant';
import { environment } from '../../environments/environment';

import { CrowdfeedCardComponent } from './components/crowdfeed-card/crowdfeed-card.component';
import { CrowdfeedHeaderCardComponent } from './components/crowdfeed-header-card/crowdfeed-header-card.component';
import { SearchPeopleCardComponent } from './components/search-people-card/search-people-card.component';
import { SearchAsksCardComponent } from './components/search-asks-card/search-asks-card.component';
import { SearchSkillsCardComponent } from './components/search-skills-card/search-skills-card.component';
import { SearchPageComponent } from 'app/pages/search-page/search-page.component';
import { SharedService } from './services/shared.service';

const classesToInclude = [
  AdminLayoutComponent,
  AppConfirmComponent,
  AskCardComponent,
  AskCircularProgressComponent,
  AskFormComponent,
  AskFriendListComponent,
  AppDropdownDirective,
  AppLoaderComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  CustomizerComponent,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  FontSizeDirective,
  HeaderSideComponent,
  HeaderTopComponent,
  LoginDialogComponent,
  NotificationsComponent,
  DashboardSideNavComponent,
  NonAuthenticatedHeaderTopComponent,
  ScrollToDirective,
  SidebarSideComponent, // not in use//
  SidebarTopComponent, // not in use//
  SidenavComponent, // not in use//
  SideNavToggleDirective,
  StepperComponent,
  SocialShareDialogComponent,
  SkillRecsComponent,
  CrowdRecsComponent,
  ReputationComponent,
  CrowdComponent,
  SkillCardsComponent,
  MyAsksComponent,
  IntroComponent,
  CrowdZipComponent,
  AskCardHeaderComponent,
  CreateSkillDialogComponent,
  RecommendationHeaderComponent,
  ShareRecommendationsComponent,
  StatsComponent,
  CrowdsComponent,
  ZcPopupFormComponent,
  RecommendedCrowdComponent,
  CreateAskRecDialogComponent,
  AskRecSocialDialogComponent,
  LoginConfirmationDialogComponent,
  CrowdfeedCardComponent,
  CrowdfeedHeaderCardComponent,
  SearchPeopleCardComponent,
  SearchAsksCardComponent,
  SearchSkillsCardComponent,
  SearchPageComponent,
  ReccomendationComponent,
  RecGivenComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    GooglePlaceModule,
    ReactiveFormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    TagInputModule,
    ShareButtonsModule,
    ChartsModule,
    MatExpansionModule
  ],
  declarations: classesToInclude,
  exports: [
    ...classesToInclude,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatStepperModule,
    MatExpansionModule
  ],
  providers: [
    AppLoaderService,
    AskService,
    AuthGuardService,
    AuthenticationService,
    CookieService,
    CrowdService,
    LandingPageService,
    LayoutService,
    NavigationService,
    ProfessionService,
    RoutePartsService,
    ThemeService,
    WindowService,
    SharedService,
    { provide: BREAKPOINT, useValue: PrintBreakpoints, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    {
      provide: apiConstants.config.professionUrl,
      useValue: environment.s3bucketUrl
    },
    SkillService,
    ReputationService,
    SearchService
  ],
  entryComponents: [
    AskFriendListComponent,
    LoginDialogComponent,
    SocialShareDialogComponent,
    CrowdZipComponent,
    CreateSkillDialogComponent,
    CreateAskRecDialogComponent,
    AskRecSocialDialogComponent,
    LoginConfirmationDialogComponent,
    ZcPopupFormComponent
  ]
})
export class SharedModule {
}
