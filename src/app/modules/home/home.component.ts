import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { Router } from '@angular/router';
import { AppService } from '../common/app.service';


@Component({
	selector: 'mm-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor (
		private route: Router,
		private authService: AuthService,
		private appService: AppService
	) {

	}

	public ngOnInit() {
		this.appService.publishState(this.appService.STATE_HOME);
	}

	public login() {
		this.authService.getUser().then(
			(user) => this.route.navigate(['playlists']),
			(err) => console.log('not logged')
		);
	}

}
