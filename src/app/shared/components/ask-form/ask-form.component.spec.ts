import { CUSTOM_ELEMENTS_SCHEMA, Directive, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { AskFormComponent } from './ask-form.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatRippleModule,
  MatSlideToggleModule
} from '@angular/material';
import { get as _get } from 'lodash';

declare let google: any;

@Directive({
  selector: '[ngx-google-places-autocomplete]',
  exportAs: 'ngx-places'
})
class MockNgXGooglePlacesAutocompleteDirective {
  @Input() options: Options;
  @Output() onAddressChange: EventEmitter<Address> = new EventEmitter();
}

describe('AskFormComponent', () => {
  let component: AskFormComponent;
  let fixture: ComponentFixture<AskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatRippleModule,
        MatSlideToggleModule
      ],
      declarations: [
        MockNgXGooglePlacesAutocompleteDirective,
        AskFormComponent
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const formBuilder = new FormBuilder();
    const askFormGroup = formBuilder.group({
      profession: [_get('', 'profession', null), Validators.required],
      location: [_get('', 'location', null), Validators.required],
      additionalDetails: [_get('', 'additionalDetails', null)],
      anyLocation: [_get('', 'anyLocation', null)],
      durationNeededBy: [_get('', 'durationNeededBy', null)],
    });

    fixture = TestBed.createComponent(AskFormComponent);
    component = fixture.componentInstance;
    component.askFormGroup = askFormGroup;
    component.professions = ['Plumber', 'Hair dresser'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
