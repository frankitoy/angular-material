import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'zpc-notifications-settings',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  checked: boolean;


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.checked = this.parentForm.controls['emailNotif'].value;
    }, 1000);
  }

  handleToggleEmailNotif(): void {
    this.checked = !this.checked;
    this.parentForm.patchValue({emailNotif: this.checked});
  }
}
