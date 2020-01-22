import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { environment } from 'environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private httpClient: HttpClient) { }

  getSkillByUserId(userId: number, offset?: number, limit?: number): Observable<Object> {
    const offsetStr = offset !== undefined ? `?offset=${offset}` : '';
    const limitStr = limit ? `&limit=${limit}` : '';
    return this.httpClient.get(`${environment.api}/dev/skill/user/${userId}${offsetStr}${limitStr}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errrors = [];

          throw error;
        })
      );
  }

  getSkillCards(token) {
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

  getCreateSkills(payload: object, token: string) {
    return this.httpClient.post(`${environment.api}/dev/skill`, payload, this.setHeader(token));
  }

  setHeader(token) {
    return {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
  }

  getSkillsTitle() {
  // return this.httpClient.get('/assets/data/skill_title.json');
   return this.httpClient.get('/assets/data/skill_title.json');
  }

  getSkillsTags(userId: number, token: string) {
    return this.httpClient.get('/assets/data/skill_tag.json', this.setHeader(token));
  }

  getSkillById(skillId: number) {
    return this.httpClient.get(`${environment.api}/dev/skill/${skillId}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }

          error.error.errrors = [];

          throw error;
        })
      );
  }

  getSkillStatsById(skillId: number) {
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

  getSkillRecs(skillId: number) {
    return this.httpClient.get(`${environment.api}/dev/skill/${skillId}/recs`)
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
