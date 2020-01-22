import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
import { SessionActions } from '../../../actions/session.actions';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from 'app/shared/services/search.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { AuthService } from 'angularx-social-login';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {

  @Input() dashboardsidenavPanel;
  @Input() notificPanel;

  public themes;
  public layoutConf: any;
  userId: string;
  avatar: string;
  firstName: string;
  lastName: string;

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,

    private themeService: ThemeService,
    private layout: LayoutService,
    private router: Router,
    private sessionActions: SessionActions,
    private searchService: SearchService,
    private userService: UserService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
      this.matIconRegistry.addSvgIcon(
        `arr-down`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-arr-dd.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `skills`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-skills.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `asks`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-asks.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `recs`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-recs.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `recs-w`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-recs-w.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `crowd`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-crowd.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `settings`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-settings.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `logout`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-logout.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `chat-bubble`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-chat-bubble.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `notifications`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-notifications.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `people`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-people.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `group`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-group.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `share`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-share.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `location`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-location.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `plus`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-plus.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `at`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-at.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `circle`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-circle.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `circle`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-circle.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `check`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-check.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `check-green`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-check-green.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `list-menu`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-list.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `view`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-eye.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `hand`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-hand.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `heart`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-heart.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `double-check`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-double-check.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `check-circle`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-check-circle.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `chat-heart`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-chat-heart.svg')
      );
      this.matIconRegistry.addSvgIcon(
        `chat-zip`,
        this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-chat-add-user.svg')
      );
    }

  ngOnInit() {
    this.themes = this.themeService.themes;
    this.layoutConf = this.layout.layoutConf;
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = userObj['id'];
    this.getUser();
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(({ response: { avatar, first_name, last_name, ...rest } }: any) => {
      this.avatar = avatar;
      this.firstName = first_name;
      this.lastName = last_name;
    });
  }

  toggledashboardSideNav () {
    this.dashboardsidenavPanel.toggle();
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  signOut() {
    this.sharedService.eraseCookie('authToken');
    if (!this.sharedService.getCookie('authToken')) {
      this.sessionActions.logout();
      localStorage.clear();
      this.authService.signOut();
      this.router.navigate(['/home']);
    }
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, {transitionClass: false });
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, {transitionClass: true });
  }

  handleSearchSubmit(): void {
    const search = this.searchForm.value.search;
    this.searchService.setSearchText(search);
    this.router.navigateByUrl('/search');
  }
}
