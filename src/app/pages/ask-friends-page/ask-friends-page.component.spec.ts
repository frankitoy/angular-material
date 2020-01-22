import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskFriendsPageComponent } from './ask-friends-page.component';

describe('AskFriendsPageComponent', () => {
  let component: AskFriendsPageComponent;
  let fixture: ComponentFixture<AskFriendsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskFriendsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskFriendsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
