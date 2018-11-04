import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';

@Component({
	selector: 'mm-callback',
	templateUrl: './callback.component.html',
	styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private errorService: ErrorService
	) {

	}

	ngOnInit() {
		this.route.fragment.subscribe((fragment: string) => {
			this.authService.callback(fragment)
				.then(res => this.router.navigate(['playlists']))
				.catch(err => this.errorService.handleError(err));
		});
	}

}
