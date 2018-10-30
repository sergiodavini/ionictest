import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../spotify/spotify.service';

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
	) {

	}

	ngOnInit() {
		this.route.fragment.subscribe((fragment: string) => {
			if (this.authService.callback(fragment)) {
				this.router.navigate(['/home']);
			}
		});
	}

}
