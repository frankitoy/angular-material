import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CreateSkillDialogComponent } from 'app/shared/components/create-skill-dialog/create-skill-dialog.component';
import { CreateAskRecDialogComponent } from 'app/shared/components/create-ask-rec-dialog/create-ask-rec-dialog.component';
import { CrowdService } from 'app/shared/services/crowd.service';

@Component({
  selector: 'zpc-login-confirmation-dialog',
  templateUrl: './login-confirmation-dialog.component.html',
  styleUrls: ['./login-confirmation-dialog.component.scss']
})
export class LoginConfirmationDialogComponent implements OnInit {
  confirmFormGroup: FormGroup;
  photo: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginConfirmationDialogComponent>,
    private dialog: MatDialog,
    private crowdService: CrowdService
  ) { }

  ngOnInit() {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    this.photo = localStorage.getItem('photoUrl') || '';

    this.confirmFormGroup = this.formBuilder.group({
      firstname: [firstName, Validators.required],
      lastname: [lastName, Validators.required],
      location: ['', Validators.required]
   });
  }

  async updateUser(email, token) {
    const { response: { id } }: any = await this.crowdService.getUserIdByEmail(email, token).toPromise();
    const payload = {
      first_name: this.confirmFormGroup.controls['firstname'].value,
      last_name: this.confirmFormGroup.controls['lastname'].value,
      location: this.confirmFormGroup.controls['location'].value,
      email,
      token,
      id
    };

    this.crowdService.updateUser(payload).subscribe((data) => { });
  }

  submitForm(event: any): void {
    this.dialogRef.close();
    if (localStorage.getItem('ask') === 'true') {
      this.dialog.open(CreateAskRecDialogComponent, {panelClass: 'create-ask-rec-dialog-container'});
    } else {
      this.dialog.open(CreateSkillDialogComponent, {panelClass: 'create-skill-dialog-container'});
    }
  }

  handleClose(): void {
    this.dialogRef.close();
  }

  handleAddressChange($event): void {
    const { formatted_address } = $event;
    this.confirmFormGroup.get('location').setValue(formatted_address);
  }
  cancelLogin() {
    console.log('cancelLogin'); // temp fix
  }
}
