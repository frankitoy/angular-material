import { Component, OnInit, OnDestroy } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subject } from 'rxjs';
import { User } from 'app/shared/models/users/user.model';
import { takeUntil, filter } from 'rxjs/operators';
import { AskService } from 'app/shared/services/ask.service';
import { Relation } from 'app/shared/models/relation/relation.model';

@Component({
  selector: 'zpc-asks',
  templateUrl: './asks.component.html',
  styleUrls: ['./asks.component.scss']
})
export class AsksComponent implements OnInit, OnDestroy {
  @select() readonly otherUser$: Observable<User>;
  @select() readonly userRelation$: Observable<Relation>;

  private _ngUnsubscribe: Subject<void> = new Subject<void>();
  userId: number;
  offset: number = 0;
  limit: number = 3;
  asksLists: Array<any> = [];
  isLoaded: boolean;
  isShowMoreHidden: boolean;
  isLoadingAsks: boolean;
  user: any;
  _relation: Relation;

  constructor(private askService: AskService) { }

  ngOnInit() {
    this.userRelation();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  userRelation() {
    this.userRelation$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(relation => !!relation)
      )
      .subscribe((relation) => {
        this._relation = relation;
        this._userSubscribe();
      });
  }

  private _userSubscribe(): void {
    this.otherUser$
      .pipe(
        takeUntil(this._ngUnsubscribe),
        filter(user => !!user)
      )
      .subscribe((user) => {
        this.userId = +user.id;
        // this.userId = +275;
        this.getAsks(this.userId);
      });
  }

  getAsks(userId: number, offset?: number, limit?: number) {
    this.isLoadingAsks = true;
    this.askService.getAsksByUserId(userId, offset, limit).subscribe((res: any) => {
      const { response: data } = res;
      if (data.length < this.limit) {
        this.isShowMoreHidden = true;
      }
      this.asksLists = [ ...this.asksLists, ...data ];
      this.offset = this.asksLists.length;
      this.isLoaded = true;
      this.isLoadingAsks = false;
    });
  }

  archiveClick(id: number) {
    const payload = { id, is_open: false };
    this.askService.updateAsk(payload).subscribe((res) => {
      if (res['response'][0] === 1) {
        this.asksLists = this.asksLists.filter((ask) => ask.id !== id);
        this.offset = this.asksLists.length;
      }
    });
  }

}
