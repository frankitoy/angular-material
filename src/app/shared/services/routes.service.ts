import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  otherUserId: BehaviorSubject<string> = new BehaviorSubject('');
  getOtherUserId = this.otherUserId.asObservable();

  constructor() { }

  getRelationRoutes(route: ActivatedRoute): Observable<Object> {
    let response;
    route.params.subscribe((params: Params) => {
      const data = JSON.parse(localStorage.getItem('user'));
      const userId = +params['id'] || data['id'];
      this.otherUserId.next(userId);
      let type = '';

      if (data) {
        if (+data['id'] === +params.id || (+data['id'] && !+params.id)) {
          type = 'owner';
        }
      } else {
        type = 'guest';
      }
      response = { type, userId };
    });

    return of(response);
  }
}
