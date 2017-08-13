import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  login: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  onLoginClick() {
    this.login = true;
    this.authService.stateUpdated.emit(this.login);
  }

  onLogoutClick() {
    this.authService.logout();
    this.login = true;
    this.authService.stateUpdated.emit(this.login);
    this.router.navigate(['/']);
  }

  onRegisterClick() {
    this.login = false;
    this.authService.stateUpdated.emit(this.login);
  }

  ngOnInit() {
  }

}
