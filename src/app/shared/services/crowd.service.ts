import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrowdService {

  constructor(private httpClient: HttpClient) { }

  usersFilter(value: string, token: string): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/user/search/${value}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  getCrowd(token: string): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/crowd`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  getCrowdOther(token: string): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/crowdOthers`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {

          throw error;
        })
      );
  }

  getCrowdITrust(token: string) {
    return this.httpClient.get(`${environment.api}/dev/crowd`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getCrowdTrustMe(token: string) {
    return this.httpClient.get(`${environment.api}/dev/crowdOthers`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  setHeader(token: string) {
    return {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
  }

  getCrowdRecs(token: string) {
    return this.httpClient.get('/assets/data/crowd_recs.json', this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  addCrowdToF1(userId: number, token: string) {
    const data = {
      friend_id: userId
    };
    return this.httpClient.post(`${environment.api}/dev/crowd`, data, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  addFBFriendtoCrowd(fbID: number, token: string) {
    const data = {
      friend_id: fbID
    };
    return this.httpClient.post(`${environment.api}/dev/crowd/fb`, data, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getDeleteF1Crowd(token: string, id: number): Observable<Object> {
    return this.httpClient.delete(`${environment.api}/dev/crowd/${id}`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          throw error;
        })
      );
  }

  search(category: string, term: string, token: string) {
    return this.httpClient.get(`${environment.api}/dev/search?cats=${category}&term=${term}&rels=0,1,2`, this.setHeader(token))
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errors = [];

          throw error;
        })
      );
  }

  getUserIdByEmail(email: string, token) {
    return this.httpClient.get(`${environment.api}/dev/user?email=${email}`, this.setHeader(token));
  }

  updateUser({token, email, ...rest}) {
    return this.httpClient.put(`${environment.api}/dev/user`, rest, this.setHeader(token))
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return EMPTY;
        }

        error.error.errors = [];

        throw error;
      })
    );
  }

  getCrowdFeed(token: string, offset: number, limit: number) {
    return this.httpClient.get(`${environment.api}/dev/crowd-feed?offset=${offset}&limit=${limit}`, this.setHeader(token));
    // return this.httpClient.get('/assets/data/crowdfeed.json', this.setHeader(token));
  }
}
