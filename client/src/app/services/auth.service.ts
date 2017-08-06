import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain = 'http://localhost:3000';

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    return this.http.post(`${this.domain}/api/auth/register`, user).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(`${this.domain}/api/auth/checkEmail/${email}`).map(res => res.json());
  }

}
