import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskFriendListComponent } from './ask-friend-list.component';

describe('AskFriendListComponent', () => {
  let component: AskFriendListComponent;
  let fixture: ComponentFixture<AskFriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskFriendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskFriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
