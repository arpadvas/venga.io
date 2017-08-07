import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean;

  constructor(
    private authService: AuthService
    ) { }

  onLoginClick() {
    this.login = true;
    this.authService.stateUpdated.emit(this.login);
  }

  onRegisterClick() {
    this.login = false;
    this.authService.stateUpdated.emit(this.login);
  }

  ngOnInit() {
  }

}
