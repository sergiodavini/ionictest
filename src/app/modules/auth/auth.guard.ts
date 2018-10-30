import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
		) {

	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		console.log('authguard', this.authService.islogged());

		if (this.authService.islogged()) {
			return true;
		} else {
			this.router.navigate(['login']);
			return false;
		}

	}
}
