import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  ResolveStart,
  ResolveEnd
} from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ObservableMedia } from '@angular/flex-layout';

import { ThemeService } from '../../../services/theme.service';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'zpc-admin-layout',
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  public isModuleLoading: Boolean = false;
  private moduleLoaderSub: Subscription;
  private layoutConfSub: Subscription;
  private routerEventSub: Subscription;

  public  scrollConfig = {};
  public layoutConf: any = {};

  constructor(
    private router: Router,
    public themeService: ThemeService,
    private layout: LayoutService,
    private media: ObservableMedia
  ) {
    // Close sidenav after route change in mobile
    this.routerEventSub = router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((routeChange: NavigationEnd) => this.layout.adjustLayout({ route: routeChange.url }));
  }

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.layout.adjustLayout(event);
  }

  scrollToTop(selector: string) {
    if (document) {
      const element = <HTMLElement>document.querySelector(selector);
      element.scrollTop = 0;
    }
  }

  ngOnDestroy() {

    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }

    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }

    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }
}
