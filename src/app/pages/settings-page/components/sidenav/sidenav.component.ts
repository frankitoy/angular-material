import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'zpc-sidenav-settings',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() activeLink = new EventEmitter();
  active: string;

  constructor() { }

  ngOnInit() {
    this.active = 'profile';
  }

  handleNavClick(type: string): void {
    this.active = type;
    this.activeLink.emit(type);
  }
}
