import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Venga.io';
  user: {email: string};

  constructor (
    private authService: AuthService
  ) {
    // renew token if user is logged in
    if (this.authService.loggedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'));
      if (this.user) {
        this.authService.renewAuthToken(this.user).subscribe(data => {

        });
      }
    }
  }

}
