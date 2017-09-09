import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ActiveGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        
    }

    canActivate(): Observable<any> {
        return this.authService.checkActive().map((res) => {
            const data = res.json();
            if (!data.success && this.authService.loggedIn()) {
                return true;
            } else if (data.success && this.authService.loggedIn()) {
                this.router.navigate(['/timeline']);
                return false;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        });
    }

}