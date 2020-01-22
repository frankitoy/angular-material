import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecGivenComponent } from './rec-given.component';

describe('RecGivenComponent', () => {
  let component: RecGivenComponent;
  let fixture: ComponentFixture<RecGivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecGivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecGivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
