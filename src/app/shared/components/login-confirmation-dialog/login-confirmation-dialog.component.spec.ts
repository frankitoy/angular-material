import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConfirmationDialogComponent } from './login-confirmation-dialog.component';

describe('LoginConfirmationDialogComponent', () => {
  let component: LoginConfirmationDialogComponent;
  let fixture: ComponentFixture<LoginConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginConfirmationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
