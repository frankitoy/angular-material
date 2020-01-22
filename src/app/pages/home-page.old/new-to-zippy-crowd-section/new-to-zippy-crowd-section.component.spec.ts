import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule, MatDialog, MatIconModule, MatToolbarModule } from '@angular/material';

import * as servicesStubs from '../../../../test/helpers/services-stub';

import { AskForm } from '../../../shared/models/forms/ask-form.model';
import { NewToZippyCrowdSectionComponent } from './new-to-zippy-crowd-section.component';

@Component({
  selector: 'zpc-ask-form',
  template: ''
})
class MockAskFormComponent {
  @Input() professions: Array<string>;
  @Input() askForm: AskForm;
  @Input() askFormGroup: FormGroup;
  @Input() enabledAdditionalDetails: boolean = false;
  @Input() slideToggleColor: string = 'primary';
}

describe('NewToZippyCrowdSectionComponent', () => {
  let component: NewToZippyCrowdSectionComponent;
  let fixture: ComponentFixture<NewToZippyCrowdSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule
      ],
      providers: [
        {
          provide: MatDialog,
          useClass: servicesStubs.MockMatDialog
        }
      ],
      declarations: [
        MockAskFormComponent,
        NewToZippyCrowdSectionComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewToZippyCrowdSectionComponent);
    component = fixture.componentInstance;
    component.professions = ['Plumber', 'Hair dresser'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
