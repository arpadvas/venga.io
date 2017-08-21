import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Venga.io';

  constructor (
    private authService: AuthService
  ) {
    if (this.authService.loggedIn()) {
      console.log('logged in');
    } else {
      console.log('logged out');
    }
  }

}
