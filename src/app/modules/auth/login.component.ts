import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
	selector: 'mm-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	title = 'app';

	constructor(
		private authService: AuthService,
		private router: Router,
	) {

	}

	login() {
		this.authService.login('prova');

		console.log('login');
		// this.router.navigate(['/home']);

	}
}
