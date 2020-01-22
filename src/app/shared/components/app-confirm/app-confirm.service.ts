import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material';

import { AppConfirmComponent } from './app-confirm.component';
import { ConfirmData } from '../../models/layouts/confirm-data.model';

@Injectable()
export class AppConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.message = data.message || 'Are you sure?';
    let dialogRef: MatDialogRef<AppConfirmComponent>;
    dialogRef = this.dialog.open(AppConfirmComponent, {
      width: '380px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}
