import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AskForm } from '../../models/forms/ask-form.model';
import { MatDialog } from '@angular/material';
import { CreateAskRecDialogComponent } from 'app/shared/components/create-ask-rec-dialog/create-ask-rec-dialog.component';

const COMMA = 188;

@Component({
  selector: 'zpc-ask-form',
  templateUrl: './ask-form.component.html'
})
export class AskFormComponent implements OnInit {

  @Input() askForm: AskForm;
  @Input() askFormGroup: FormGroup;
  @Input() durationOptions: Array<string>;
  @Input() enabledAdditionalDetails: boolean = false;
  @Input() professions: Array<string>;
  @Input() selectable: boolean = false;
  @Input() slideToggleColor: string = 'primary';

  separatorKeysCodes = [COMMA];

  @Output() askFormUpdated: EventEmitter<AskForm> = new EventEmitter<AskForm>();

  public checked: boolean = false;
  public filteredOptions: Observable<string[]>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this._disableFormLocation();
    this._setFilteredOptions();
    this.checked = this.checked;
  }

  handleAddressChange($event): void {
    const { formatted_address } = $event;
    this.askFormGroup.get('location').setValue(formatted_address);
  }

  submitForm($event): void {
    $event.preventDefault();
    if (this.askFormGroup.valid) {
      this.askFormUpdated.emit(this.askFormGroup.getRawValue() as AskForm);
    }
  }

  toggleChange(): void {
    this.checked = !this.checked;
    this._disableFormLocation();
  }

  handleDurationNeededBy($event): void {
    this.askFormGroup.get('durationSelected').setValue($event);
  }

  private _disableFormLocation(): void {
    if (!this.checked) {
      this.askFormGroup.get('location').enable();
    } else {
      this.askFormGroup.get('location').disable();
    }
  }

  private _filter(value: string): Array<string> {
    const filterValue = (!!value) ? value.toLowerCase() : '';
    return this.professions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _setFilteredOptions(): void {
    this.filteredOptions = this.askFormGroup.get('profession').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  handleOpenAskRec() {
    this.dialog.open(CreateAskRecDialogComponent, {panelClass: 'create-ask-rec-dialog-container'});
  }
}
