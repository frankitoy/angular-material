import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'zpc-dashboardsidenav',
    templateUrl: './dashboard-sidenav.component.html'
})
export class DashboardSideNavComponent implements OnInit {

    @Input() dashboardsidenavPanel;

    // Dummy notifications
    // notifications = [{
    //     message: 'New contact added',
    //     icon: 'assignment_ind',
    //     time: '1 min ago',
    //     route: '/inbox',
    //     color: 'primary'
    // }, {
    //     message: 'New message',
    //     icon: 'chat',
    //     time: '4 min ago',
    //     route: '/chat',
    //     color: 'accent'
    // }, {
    //     message: 'Server rebooted',
    //     icon: 'settings_backup_restore',
    //     time: '12 min ago',
    //     route: '/charts',
    //     color: 'warn'
    // }];

    constructor(private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((routeChange) => {
            if (routeChange instanceof NavigationEnd) {
                this.dashboardsidenavPanel.close();
            }
        });
    }
    closedSideNav (e) {
        e.preventDefault();
        this.dashboardsidenavPanel.close();
    }
    // clearAll(e) {
        // e.preventDefault();
        // this.notifications = [];
    // }
}
