import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';
import { Playlist } from '../spotify/data/playlists.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'mm-playlist',
	templateUrl: './playlist.component.html',
	styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

	playlist: Playlist;
	firstlink =  1;
	lastlink = 9;
	page = 1;
	maxpage = 1;
	lastpage = false;
	pagelimit = 50;
	id;

	constructor (
		private spotifyService: SpotifyService,
		private authService: AuthService,
		private errorService: ErrorService,
		private route: ActivatedRoute,
		private router: Router
	) {

	}

	public ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		this.getPlayList();
	}

	public getPlayList() {

		const token: string = this.authService.getToken();
		this.spotifyService.getPlaylist(token, this.id).subscribe(
			(res) => this.onListSuccess(res),
			(res) => this.onError(res)
		);
	}

	onListSuccess(res) {

		this.playlist = res.body;



	}


	onError(res) {
		this.errorService.handleError(res);
	}

	getImage(item: Playlist): string {
		let size = 999999;
		let url;
		if (item.images !== undefined) {
			item.images.forEach(image => {
				if (image.width < size) {
					size = image.width;
					url = image.url;
				}
			});
		}
		return url;
	}

	public doCover() {
		this.router.navigate(['/cover/' + this.id]);
	}

}
