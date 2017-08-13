import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = 'http://localhost:3000';
  stateUpdated = new EventEmitter<boolean>();
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    return this.http.post(`${this.domain}/api/auth/register`, user).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(`${this.domain}/api/auth/checkEmail/${email}`).map(res => res.json());
  }

  login(user) {
    return this.http.post(`${this.domain}/api/auth/login`, user).map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(`${this.domain}/api/auth/profile`, this.options).map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
