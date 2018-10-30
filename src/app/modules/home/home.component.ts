import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { Router } from '@angular/router';

@Component({
	selector: 'mm-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {

	constructor (
		private route: Router
	) {

	}

	public listNewReleases() {
		this.route.navigate(['/newrelease']);
	}

	public listPlaylists() {
		this.route.navigate(['/playlists']);
	}

}
