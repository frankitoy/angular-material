import { Component, OnInit, Input, Renderer2 } from '@angular/core';

// import { Subscription } from 'rxjs';

// import { NavigationService } from '../../services/navigation.service';
// import { LayoutService } from '../../services/layout.service';
// import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'zpc-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderTopComponent implements OnInit {
  // layoutConf: any;
  // menuItems: any;
  // menuItemSub: Subscription;
  // themes: Array<any> = [];
  // currentLang = 'en';
  // @Input() notificPanel;
  // @Input() dashboardsidenavPanel;

  constructor(
    // private layout: LayoutService,
    // private navService: NavigationService,
    // public themeService: ThemeService,
    // private renderer: Renderer2
  ) { }

  ngOnInit() {
    // this.layoutConf = this.layout.layoutConf;
    // this.themes = this.themeService.themes;
    // this.menuItemSub = this.navService.menuItems$
    // .subscribe(res => {
    //   res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
    //   const limit = 4;

    //   const mainItems: any[] = res.slice(0, limit);
    //   if (res.length <= limit) {
    //     return this.menuItems = mainItems;
    //   }

    //   const subItems: any[] = res.slice(limit, res.length - 1);
    //   mainItems.push({
    //     name: 'More',
    //     type: 'dropDown',
    //     tooltip: 'More',
    //     icon: 'more_horiz',
    //     sub: subItems
    //   });

    //   this.menuItems = mainItems;
    // });
  }

  // ngOnDestroy() {
  //   this.menuItemSub.unsubscribe();
  // }

  // setLang() {
  // }

  // changeTheme(theme): void {
  //   this.themeService.changeTheme(this.renderer, theme);
  // }

  // toggleNotific() {
  //   this.notificPanel.toggle();
  // }
  // toggleSidenav() {
  //   if (this.layoutConf.sidebarStyle === 'closed') {
  //     return this.layout.publishLayoutChange({
  //       sidebarStyle: 'full'
  //     });
  //   }
  //   this.layout.publishLayoutChange({
  //     sidebarStyle: 'closed'
  //   });
  // }
}
