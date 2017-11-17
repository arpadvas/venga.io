import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ServerResponse } from 'app/models/server-response.model';

@Injectable()
export class CragsService {

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

  // get crags
  getCrags(): Observable<ServerResponse> {
    this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/api/crag/crags`, this.options)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // search crags
  queryCrags(keyword): Observable<ServerResponse> {
    this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/api/crag/crags/${keyword}`, this.options)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // add crag
  addCrag(crag): Observable<ServerResponse> {
    this.createAuthenticationHeaders();
    return this.http.post(`${this.domain}/api/crag/crags`, crag, this.options)
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