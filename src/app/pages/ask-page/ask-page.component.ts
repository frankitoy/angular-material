import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Ask } from 'app/shared/models/ask/ask.model';
import { AskService } from 'app/shared/services/ask.service';
import { Observable, Subject } from 'rxjs';
import { Relation } from 'app/shared/models/relation/relation.model';
import { select } from '@angular-redux/store';
import { takeUntil, filter } from 'rxjs/operators';

// import { SwiperComponent, SwiperConfigInterface,  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
// import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';


@Component({
  selector: 'zpc-ask-page',
  templateUrl: './ask-page.component.html',
  styleUrls: ['./ask-page.component.scss']
})

export class AskPageComponent implements OnInit, OnDestroy {
  @select() readonly userRelation$: Observable<Relation>;
  _ngUnsubscribe: Subject<void> = new Subject<void>();
  _relation: Relation;
  ask: Ask;
  panelOpenState = false;

  private askId: number;
  public config: object;
  public index: string;
  isClosed: boolean = true;
  recommendations: any;
  title: string;
  totalRecs: number;
  askStats: any;
  // public config: SwiperConfigInterface = {
  //   a11y: true,
  //   direction: 'horizontal',
  //   keyboard: true,
  //   mousewheel: true,
  //   scrollbar: false,
  //   navigation: true,
  //   pagination: false,
  //   slidesPerView: 3,//'auto',
  // spaceBetween: 30,
  // slidesPerGroup: 3,
  // //loop: true,
  // loopFillGroupWithBlank: true
  // };

  constructor(
    private route: ActivatedRoute,
    private askService: AskService
  ) { }

  ngOnInit() {
    this.userRelation();
    this.askId = +this.route.snapshot.paramMap.get('id');
    this.getAsk(this.askId);
    this.getRecommendations(this.askId);
    this.getAskStats(this.askId);
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
      });
  }

  getAsk(id: number) {
    this.askService.getAskById(id).subscribe(({ response }: any) => {
      this.ask = response;
      this.title = response.title;
    });
  }

  getRecommendations(id: number) {
    let arrayLocal = {};
    this.askService.getAskRecs(id).subscribe(({response}: any) => {
      this.totalRecs = response.length;
      response.map(({managed_crowd_id, user_id, updated_at}) => {
        arrayLocal = {
          ...arrayLocal,
          [managed_crowd_id]: [...(arrayLocal[managed_crowd_id] || []), { id: user_id, date: updated_at }]
        };
      });

      this.recommendations = Object.keys(arrayLocal).map((key) => {
        return { id: key, child: arrayLocal[key], state: false };
      });
    });
  }

  getAskStats(id: number) {
    this.askService.getAskStatsById(id).subscribe(({response}: any) => {
      this.askStats = { ...response };
    });
  }

  panelState(recId: number, status: boolean) {
    this.recommendations.map((item) => {
      if (item.id === recId) {
        item.state = status;
      }
    });
  }

  public onIndexChange(index: number): void {
    // console.log('Swiper index: ', index);
  }

  public onSwiperEvent(event: string): void {
    console.log('Swiper event: ', event);
  }

  onOpenPanel(id: number, status: boolean) {
    return;
  }
}
