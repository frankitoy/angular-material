import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { AskForm } from '../../../shared/models/forms/ask-form.model';

@Component({
  selector: 'zpc-new-to-zippy-crowd-section',
  templateUrl: './new-to-zippy-crowd-section.component.html'
})
export class NewToZippyCrowdSectionComponent {

  @Input() askFormGroup: FormGroup;
  @Input() professions: Array<string>;

  @Output() askFormUpdated: EventEmitter<AskForm> = new EventEmitter<AskForm>();
  @Output() loginEmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  formUpdated($event: AskForm): void {
    this.askFormUpdated.emit($event);
  }

  login($event): void {
    $event.preventDefault();
    this.loginEmitted.emit(true);
  }
}
