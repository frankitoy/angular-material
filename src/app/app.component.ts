import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ThemeService } from './shared/services/theme.service';
import { RoutePartsService } from './shared/services/route-parts.service';
import { environment } from '../environments/environment';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'zpc-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  appTitle = environment.appName;
  pageTitle = '';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private renderer: Renderer2,
    private routePartsService:          RoutePartsService,
    private themeService: ThemeService,
  ) {
    this.matIconRegistry.addSvgIcon(
      `recs-pink`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-recs-pink.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `favorite`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-favorite.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `clock`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-clock.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `zc`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-zc.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `star`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-star.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `crowd-lx`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-crowd-lx.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `dashboard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-dashboard.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `ask-rec`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-chat-skill.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `asksrecs`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-asksrecs.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `getwork`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-getwork.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `zipcrowd`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-zipcrowd.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `skillicon`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-skillicon.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `reddot`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-reddot.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `offer`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-offer.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `recstick`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-recstick.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `favred`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-fav-red.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `users`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-users.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `view`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-view.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `sharecard`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-share-card.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `singletick`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-single-tick.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `chat-cta`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/img/icons/ic-chat-cta.svg')
    );
   }

  ngOnInit() {
    this._changePageTitle();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    this.themeService.applyMatTheme(this.renderer);
  }

  getCookie(name: string) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
  }

  private _changePageTitle(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(_ => {
      const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
      if (!routeParts.length) {
        return this.title.setTitle(this.appTitle);
      }

      this.pageTitle = routeParts
        .reverse()
        .map((part) => part.title )
        .reduce((partA, partI) => `${partA} > ${partI}`);

      this.pageTitle += ` | ${this.appTitle}`;
      this.title.setTitle(this.pageTitle);
    });
  }
}
