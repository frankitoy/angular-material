import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { Settings } from 'app/shared/models/profiles/settings.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  @ViewChild('notif') notif: ElementRef;
  @ViewChild('prof') prof: ElementRef;
  @ViewChild('social') social: ElementRef;
  @ViewChild('account') account: ElementRef;
  parentForm: FormGroup;
  userId: string;
  userToken: string;
  profile: Settings;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    this.userId = userObj['id'];
    this.userToken = this.sharedService.getCookie('authToken');

    this.getUserDetails();

    this.parentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', ''],
      about: ['', ''],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', ''],
      website: ['', ''],
      emailNotif: [false, ''],
      facebook: ['', ''],
      linkedin: ['', ''],
      twitter: ['', ''],
      youtube: ['', ''],
      instagram: ['', ''],
      fbconnect: [false, ''],
      gconnect: [false, ''],
      active: [false, '']
    });
  }

  getUserDetails() {
    this.userService.getUserById(this.userId).subscribe(({ response }: any) => {
      this.profile = response;
      const social = JSON.parse(response.social);
      this.parentForm.patchValue({ 'firstName': response.first_name });
      this.parentForm.patchValue({ 'lastName': response.last_name });
      this.parentForm.patchValue({ 'location': response.location });
      this.parentForm.patchValue({ 'about': response.about });
      this.parentForm.patchValue({ 'email': response.email });
      this.parentForm.patchValue({ 'mobile': response.mobile });
      this.parentForm.patchValue({ 'active': response.active === null || response.active ? true : false });
      this.parentForm.patchValue({ 'website': social.website || '' });
      this.parentForm.patchValue({ 'emailNotif': response.email_notifications || '' });
      this.parentForm.patchValue({ 'facebook': social.facebook || '' });
      this.parentForm.patchValue({ 'linkedin': social.linkedin || '' });
      this.parentForm.patchValue({ 'twitter': social.twitter || '' });
      this.parentForm.patchValue({ 'youtube': social.youtube || '' });
      this.parentForm.patchValue({ 'instagram': social.instagram || '' });
      if (response.provider === 'GOOGLE') {
        this.parentForm.patchValue({ 'gconnect': true });
      } else {
        this.parentForm.patchValue({ 'fbconnect': true });
      }
    });
  }

  handleSave(): void {
    const payload = {
      id: this.userId,
      email: this.parentForm.controls['email'].value,
      about: this.parentForm.controls['about'].value,
      first_name: this.parentForm.controls['firstName'].value,
      last_name: this.parentForm.controls['lastName'].value,
      location: this.parentForm.controls['location'].value,
      email_notifications: this.parentForm.controls['emailNotif'].value || false,
      active: !this.parentForm.controls['active'].value,
      social: {
        website: this.parentForm.controls['website'].value,
        facebook: this.parentForm.controls['facebook'].value,
        linkedin: this.parentForm.controls['linkedin'].value,
        twitter: this.parentForm.controls['twitter'].value,
        youtube: this.parentForm.controls['youtube'].value,
        instagram: this.parentForm.controls['instagram'].value,
      }
    };

    this.userService.update(payload).subscribe(({response}) => {
      if (response[0]) {
        this.snackBar.open('Profile saved!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  handleActiveLinkClick(type: string): void {
    let scroll: number;
    if (type === 'notif') {
      scroll = this.notif.nativeElement.offsetTop;
    } else if (type === 'profile') {
      scroll = this.prof.nativeElement.offsetTop;
    } else if (type === 'social') {
      scroll = this.social.nativeElement.offsetTop;
    } else if (type === 'account') {
      scroll = this.account.nativeElement.offsetTop;
    }

    window.scrollTo(0, scroll);
  }

  handleDeleteAccount() {
    if (window.confirm('Are you sure you want to close your account permanently?')) {
      this.userService.deleteUser(Number(this.userId), this.userToken).subscribe(({ response }: any) => {
        this.router.navigate(['/home']);
        localStorage.clear();
      });
    }
  }
}


