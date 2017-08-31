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
  userDetailsForNavbar: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
      // update user details if they are changed
      this.authService.userDetailsForNavbarUpdated.subscribe((userDetailsForNavbar) => {
        this.userDetailsForNavbar.name = userDetailsForNavbar.name;
      });
    }

  onLoginClick() {
    this.login = true;
    this.authService.stateUpdated.emit(this.login);
  }

  onLogoutClick() {
    this.authService.logout();
    this.login = true;
    this.authService.stateUpdated.emit(this.login);
    this.userDetailsForNavbar = {};
    this.router.navigate(['/']);
  }

  onRegisterClick() {
    this.login = false;
    this.authService.stateUpdated.emit(this.login);
  }

  ngOnInit() {
    // update navbar with user details when if user is logged in
    if (this.authService.loggedIn()) {
      this.authService.getUserDetailForNavbar().subscribe(profile => {
            this.userDetailsForNavbar.name = profile.user.name;
          });
    }
  }

}
