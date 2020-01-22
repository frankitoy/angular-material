import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'zpc-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent implements OnInit {
  @Input() parentForm: FormGroup;
  facebook: any;
  linkedin: any;
  twitter: any;
  youtube: any;
  instagram: any;


  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    setTimeout(() => {
      this.facebook = this.parentForm.controls['facebook'].value || true;
      this.linkedin = this.parentForm.controls['linkedin'].value || true;
      this.twitter = this.parentForm.controls['twitter'].value || true;
      this.youtube = this.parentForm.controls['youtube'].value || true;
      this.instagram = this.parentForm.controls['instagram'].value || true;
    }, 1000);
  }

  handleLinkToggle(type: string, value): void {
    if (type === 'facebook') {
      this.parentForm.patchValue({'facebook': ''});
      this.facebook = value;
    } else if (type === 'linkedin') {
      this.parentForm.patchValue({'linkedin': ''});
      this.linkedin = value;
    } else if (type === 'twitter') {
      this.parentForm.patchValue({'twitter': ''});
      this.twitter = value;
    } else if (type === 'youtube') {
      this.parentForm.patchValue({'youtube': ''});
      this.youtube = value;
    } else if (type === 'instagram') {
      this.parentForm.patchValue({'instagram': ''});
      this.instagram = value;
    }
  }

  handleSubmit(type: string): void {
    if (type === 'facebook') {
      if (this.validURL(this.parentForm.controls['facebook'].value)) {
        this.facebook = this.parentForm.controls['facebook'].value;
      } else {
        this.snackBar.open(`Invalid URL for ${type}`, 'Close', {
          duration: 3000
        });
      }
    } else if (type === 'linkedin') {
      if (this.validURL(this.parentForm.controls['linkedin'].value)) {
        this.linkedin = this.parentForm.controls['linkedin'].value;
      } else {
        this.snackBar.open(`Invalid URL for ${type}`, 'Close', {
          duration: 3000
        });
      }
    } else if (type === 'twitter') {
      if (this.validURL(this.parentForm.controls['twitter'].value)) {
        this.twitter = this.parentForm.controls['twitter'].value;
      } else {
        this.snackBar.open(`Invalid URL for ${type}`, 'Close', {
          duration: 3000
        });
      }
    } else if (type === 'youtube') {
      if (this.validURL(this.parentForm.controls['youtube'].value)) {
        this.youtube = this.parentForm.controls['youtube'].value;
      } else {
        this.snackBar.open(`Invalid URL for ${type}`, 'Close', {
          duration: 3000
        });
      }
    } else if (type === 'instagram') {
      if (this.validURL(this.parentForm.controls['instagram'].value)) {
        this.instagram = this.parentForm.controls['instagram'].value;
      } else {
        this.snackBar.open(`Invalid URL for ${type}`, 'Close', {
          duration: 3000
        });
      }
    }
  }

  validURL(str: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }
}
