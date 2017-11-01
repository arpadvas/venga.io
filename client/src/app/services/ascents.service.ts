import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Ascent } from '../models/ascent.model';

@Injectable()
export class AscentsService {

  domain = 'http://localhost:3000';
  authToken;
  options;

  constructor(
    private http: Http
  ) { }

  // create header with token
  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  // load token from storage
  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  // get user profile
  getAscents(): Observable<Array<Ascent>> {
    this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/api/ascent/ascents`, this.options)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // handle errors
  private handleResponseError(res): Observable<any> {
    return Observable.throw(res);
  }

}
