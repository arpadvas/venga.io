import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginState: boolean = false;

  constructor(
    private authService: AuthService
  ) {
    this.authService.stateUpdated.subscribe((login: boolean) => {
      if (login) {
        this.loginState = true;
      } else {
        this.loginState = false;
      }
    });
  }

  ngOnInit() {
  }

}
