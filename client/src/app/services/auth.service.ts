import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  domain = 'http://localhost:3000';
  stateUpdated = new EventEmitter<boolean>();
  userDetailsForNavbarUpdated = new EventEmitter<{}>();
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  // register user
  registerUser(user): Observable<any> {
    return this.http.post(`${this.domain}/api/auth/register`, user)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // check if email is already taken
  checkEmail(email) {
    return this.http.get(`${this.domain}/api/auth/checkEmail/${email}`)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // login user
  login(user) {
    return this.http.post(`${this.domain}/api/auth/login`, user)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // renew auth token
  renewAuthToken(user) {
    return this.http.post(`${this.domain}/api/auth/renewAuthToken`, user)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // logout user
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // store user data in storage
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

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

  // get user details for navbar
  getUserDetailForNavbar() {
    this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/api/auth/userDetailsForNavbar`, this.options)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // check if user is logged in
  loggedIn() {
    return tokenNotExpired();
  }

  // activate user
  activate(code) {
    this.createAuthenticationHeaders();
    return this.http.post(`${this.domain}/api/auth/activate`, code, this.options)
      .map(res => res.json())
        .catch((res) => {
          return this.handleResponseError(res);
        });
  }

  // check if user is active
  checkActive() {
    this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/api/auth/checkActive`, this.options);
  }

  // handle errors
  private handleResponseError(res): Observable<any> {
    return Observable.throw(res);
  }

}
