import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ActiveGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        
    }

    canActivate() {
        if (this.authService.loggedIn() && !this.authService.checkActive()) {
            return true;
        } else {
            this.router.navigate(['/timeline']);
            return false;
        }
    }

}