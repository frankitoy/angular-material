import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgReduxModule } from '@angular-redux/store';
import { NgReduxTestingModule } from '@angular-redux/store/testing';

import { NonAuthenticatedHeaderTopComponent } from './non-authenticated-header-top.component';
import { SharedModule } from '../../shared.module';

describe('NonAuthenticatedHeaderTopComponent', () => {
  let component: NonAuthenticatedHeaderTopComponent;
  let fixture: ComponentFixture<NonAuthenticatedHeaderTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgReduxModule,
        NgReduxTestingModule,
        RouterTestingModule,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthenticatedHeaderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
