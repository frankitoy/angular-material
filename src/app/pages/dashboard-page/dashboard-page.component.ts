import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zpc-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  userName: string;
  constructor() {}

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userName = userObj['firstName'];
  }

}

