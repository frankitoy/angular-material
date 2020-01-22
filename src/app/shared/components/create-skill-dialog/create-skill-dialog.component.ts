import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialogRef, MatSelectionList, MatListOption, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from '../../../../environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { WindowService } from '../../services/window.service';
import { SkillService } from 'app/shared/services/skill.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'zpc-create-skill-dialog',
  templateUrl: './create-skill-dialog.component.html',
  styleUrls: ['./create-skill-dialog.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateSkillDialogComponent implements OnInit {
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;
  @ViewChild('stepper') stepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  offer = new FormControl();
  skillsTitle: any;
  skillTags: string[];
  checkedActive = true;
  checkedLocation = false;
  selectedSkills: string;
  selectedSkillTags: any[];
  userId: number;
  userToken: string;
  fullName: string;
  socialStatus: boolean;
  isSmallScreen: boolean;
  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateSkillDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    private windowService: WindowService,
    private skillService: SkillService,
    private snackBar: MatSnackBar,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const userObj = JSON.parse(localStorage.getItem('user'));
    const skill = localStorage.getItem('type') || '';
    this.userId = Number(userObj['id']);
    this.userToken = this.sharedService.getCookie('authToken');
    this.fullName = `${userObj['firstName']} ${userObj['lastName']}`;
    this.selectedSkillTags = [];
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.offer.setValue(this.checkedActive);
    this.firstFormGroup = this.formBuilder.group({
      skillCardCtrl: [skill, Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      skillCardCtrl: [skill, Validators.required],
      location: ['', Validators.required],
      anyLocation: ['', ''],
      descriptionCtrl: ['', '']
    });

    this.breakPointChecker();
    this.getSkillsTitle(this.userId, this.userToken);
    this.getSkillsTags(this.userId, this.userToken);

    localStorage.removeItem('type');
  }

  getSkillsTitle(userId, token) {
    // this.professionService.loadProfession().subscribe(response => {
    //   this.skillsTitle = response;
    // });
    this.skillService.getSkillsTitle().subscribe(data => {
      this.skillsTitle =  Array.of(data);
      this.skillsTitle = this.skillsTitle[0].response.skills;
      }
    );
  }

  getSkillsTags(userId, token) {
    this.skillService.getSkillsTags(userId, token).subscribe(({response}: any) => {
      this.skillTags = response.tags;
    });
  }

  breakPointChecker(): void {
    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).
    pipe(
      takeUntil(this._ngUnsubscribe),
      filter(result => !!result && !!result.matches)
    ).
    subscribe(_ => this.isSmallScreen = true);
  }

  handleSkillChange(value) {
    this.firstFormGroup.patchValue({skillCardCtrl: value});
    this.secondFormGroup.patchValue({skillCardCtrl: value});
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  toggleChange(): void {
    this.checkedLocation = !this.checkedLocation;
    if (this.checkedLocation) {
      this.secondFormGroup.patchValue({location: 'Any Location'});
    } else {
      this.secondFormGroup.patchValue({location: ''});
    }
    this._disableFormLocation();
  }

  handleAddressChange($event): void {
    const { formatted_address } = $event;
    this.secondFormGroup.get('location').setValue(formatted_address);
  }

  private _disableFormLocation(): void {
    if (!this.checkedLocation) {
      this.secondFormGroup.get('location').enable();
    } else {
      this.secondFormGroup.get('location').disable();
    }
  }

  handleSkillCardChange(event): void {
    const value = event.target.value;
    this.firstFormGroup.patchValue({skillCardCtrl: value});
  }

  handleSkillTagsChange({value, _selected}: any): void {
    if (_selected) {
      this.selectedSkillTags = [...this.selectedSkillTags, value];
    } else {
      this.selectedSkillTags = this.selectedSkillTags.filter(data => data !== value);
    }
  }

  handleOpenToOffers(): void {
    this.checkedActive = !this.checkedActive;
  }

  socialToggle(): void {
    this.socialStatus = !this.socialStatus;
  }

  handleFBInvite() {
    FB.ui({
      method: 'share',
      href: `${environment.api}/dev/ask/${this.userId}/share`
    });
  }

  handleMessengerInvite(): void {
    FB.ui({
      method: 'send',
      link: `${environment.api}/dev/ask/${this.userId}/share`
    });
  }

  handleWhatsAppInvite(screen: string): void {
    if (screen === 'pc') {
      this.windowService.nativeWindow.open(`https://web.whatsapp.com/send?text=${environment.api}/dev/user/${this.userId}/share`);
    } else {
      this.windowService.nativeWindow.open(`whatsapp://send?text=${environment.api}/dev/user/${this.userId}/share`);
    }
  }
  createSkill(): void {
    const title = this.firstFormGroup.controls['skillCardCtrl'].value;
    const location = this.checkedLocation ? 'Any Location' : this.secondFormGroup.controls['location'].value || 'Any Location';
    const description = this.secondFormGroup.controls['descriptionCtrl'].value;
    const tags = this.selectedSkillTags.join();
    const active = this.checkedActive;
    const payload = {
      user_id: this.userId,
      title,
      location,
      description,
      tags,
      active
    };

    this.skillService.getCreateSkills(payload, this.userToken).subscribe(data => {
      this.firstFormGroup.patchValue({skillCardCtrl: ''});
      this.secondFormGroup.patchValue({location: ''});
      this.secondFormGroup.patchValue({descriptionCtrl: ''});
      this.checkedLocation = false;
      this.checkedActive = true;
      this.offer.setValue(this.checkedActive);
      this.selectedSkillTags = [];
      this.dialogRef.close();

      this.snackBar.open('Skill was saved', 'Close', {
        duration: 3000
      });
    });
  }
}
