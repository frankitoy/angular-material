import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchText: BehaviorSubject<string> = new BehaviorSubject('');
  getSearchText = this.searchText.asObservable();

  searchMainFilter: BehaviorSubject<string> = new BehaviorSubject('');
  getMainFilter = this.searchMainFilter.asObservable();

  constructor(private httpClient: HttpClient) { }

  setSearchText(type) {
    this.searchText.next(type);
  }

  setMainFilter(type) {
    this.searchMainFilter.next(type);
  }

  getSearch(token: string, text: string, main: string, sub: string) {

    let rels = '';
    let term = '';
    let cat = '';

    if (sub === 'me') {
      rels = '&rels=0';
    } else if (sub === 'f1') {
      rels = '&rels=1';
    } else if (sub === 'f2') {
      rels = '&rels=2';
    } else {
      rels = '&rels=0,1,2';
    }

    if (text) {
      term = `&term=${text}`;
    }
    if (main) {
      if (main === 'asks') {
        main = 'ask';
      } else if (main === 'skills') {
        main = 'skill';
      }
      cat = `cats=${main}`;
    } else {
      cat = `cats=ask,skill`;
    }

    return this.httpClient.get(`${environment.api}/dev/search?${cat}${term}${rels}`, this.setHeader(token)).toPromise();
  }

  setHeader(token) {
    return {
      headers: new HttpHeaders({
        Authorization: token
      })
    };
  }
}
