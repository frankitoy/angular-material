import { convertToParamMap, Data, ParamMap, Params } from '@angular/router';
import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

/*
 * An ActivateRoute test mock with data and param observables.
 * Use the `setParamMap()/setData()` methods to add the next `paramMap/data` values.
 */
/* istanbul ignore next */
export class MockActivatedRoute {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();
  private dataSubject = new ReplaySubject<Data>();

  data: Observable<Data> = this.dataSubject.asObservable();

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }

  setData(data?: Data) {
    this.dataSubject.next(data);
  }
}

/* istanbul ignore next */
@Injectable()
export class MockRouter {
  navigate(commands: any[], extras?: any) {}
}

