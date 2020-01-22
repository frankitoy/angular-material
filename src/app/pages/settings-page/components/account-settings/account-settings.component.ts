import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'zpc-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Output() deleteAccount = new EventEmitter();
  isCheckFB: boolean;
  isCheckGoogle: boolean;
  isCheckDeactive: boolean;
  fbconnect: boolean;
  gconnect: boolean;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.fbconnect = this.parentForm.controls['fbconnect'].value;
      this.gconnect = this.parentForm.controls['gconnect'].value;
      this.isCheckDeactive = this.parentForm.controls['active'].value;
    }, 1000);
  }

  handleToggleFBConnect(): void {
    this.isCheckFB = !this.isCheckFB;
    this.parentForm.patchValue({fbconnect: this.isCheckFB});
  }

  handleToggleGoogleConnect(): void {
    this.isCheckGoogle = !this.isCheckGoogle;
    this.parentForm.patchValue({gconnect: this.isCheckGoogle});
  }

  handleToggleDeactiveAccount(): void {
    this.isCheckDeactive = !this.isCheckDeactive;
    this.parentForm.patchValue({active: this.isCheckDeactive});
  }

  handleToggleDeleteAccount(): void {
    this.deleteAccount.emit();
  }
}
