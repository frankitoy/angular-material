import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Ask } from '../models/ask/ask.model';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  constructor(private httpClient: HttpClient) { }

  public create(ask): Observable<Object> {
    return this.httpClient.post(`${environment.api}/dev/ask`, ask)
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

  public getAskById(askId): Observable<Object> {
    return this.httpClient.get(`${environment.api}/dev/ask/${askId}`)
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

  getAskCards(token) {
    return this.httpClient.get('/assets/data/skill_card.json', this.setHeader(token))
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

  setHeader(token) {
    return {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
  }

  getAsksByUserId(userId: number, offset: number = 0, limit: number = 3) {
    return this.httpClient.get(`${environment.api}/dev/ask/user/${userId}?offset=${offset}&limit=${limit}`)
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

  updateAsk(payload) {
    return this.httpClient.put(`${environment.api}/dev/ask`, payload)
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

  getAskRecs(askId: number) {
    return this.httpClient.get(`${environment.api}/dev/ask/${askId}/recs`)
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

  getAskStatsById(askId: number) {
    return this.httpClient.get(`/assets/data/ask_stats.json`)
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
}
