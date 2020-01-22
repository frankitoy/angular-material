import { Component, Input } from '@angular/core';

@Component({
  selector: 'zpc-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {

  @Input() items: any[] = [];
  @Input() hasIconMenu: boolean;
  @Input() iconMenuTitle: string;

  constructor() {}

  // Only for demo purpose
  addMenuItem() {
    this.items.push({
      name: 'ITEM',
      type: 'dropDown',
      tooltip: 'Item',
      icon: 'done',
      state: 'material',
      sub: [
        {name: 'SUBITEM', state: 'cards'},
        {name: 'SUBITEM', state: 'buttons'}
      ]
    });
  }
}
