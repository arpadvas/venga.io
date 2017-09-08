import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        
    }

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.authService.checkActive().map((res) => {
            const data = res.json();
            if (data.success && this.authService.loggedIn()) {
                return true;
            } else {
                this.redirectUrl = state.url;
                this.router.navigate(['/activate']);
                return false;
            }
        });
    }

}