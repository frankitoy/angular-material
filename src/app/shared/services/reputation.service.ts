import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReputationService {

  constructor(private httpClient: HttpClient) { }

  getReputation(userId: number) {
    return this.httpClient.get('/assets/data/reputation.json')
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
