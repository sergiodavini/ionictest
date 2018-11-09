import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';
import { Playlists, Playlist } from '../spotify/data/playlists.model';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../common/app.service';

@Component({
	selector: 'mm-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

	playlists: Playlists;
	index = 0;
	pagelimit = 50;

	constructor (
		private spotifyService: SpotifyService,
		private authService: AuthService,
		private errorService: ErrorService,
		private route: Router,
		private sanitizer: DomSanitizer,
		private appService: AppService
	) {

	}

	public ngOnInit() {
		this.appService.publishState(this.appService.STATE_LISTS, undefined);
		this.getPlaylists(1);
	}


	public getPlaylists(page) {

		const offset: number = (page - 1) * this.pagelimit;
		const token: string = this.authService.getToken();
		this.spotifyService.listPlaylists(token, offset, this.pagelimit).subscribe(
			(res) => this.onListSuccess(res),
			(res) => this.onError(res)
		);
	}

	onListSuccess(res) {

		this.playlists = res.body;
		this.index = 0;

	}

	onError(res) {
		this.errorService.handleError(res);
	}

	goPlaylist() {
		const item: Playlist = this.playlists.items[this.index];
		this.route.navigate(['option/' +  item.id]);
	}

	next() {
		this.index = this.index + 1 ;
		if (this.index >= this.playlists.items.length) {
			this.index = 0;
		}
	}
	previous() {
		this.index = this.index - 1 ;
		if (this.index < 0 ) {
			this.index = this.playlists.items.length - 1;
		}
	}

	getCurrentImage() {
		const url = this.getImage(this.playlists.items[this.index]);
		return this.sanitizer.bypassSecurityTrustStyle('url(\'' + url + '\')');
	}

	getCurrentImageUrl() {
		const url = this.getImage(this.playlists.items[this.index]);
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
 
	getImage(item: Playlist): string {
		let size = -1;
		let url;
		if (item.images !== undefined) {
			item.images.forEach(image => {
				if (image.width > size) {
					size = image.width;
					url = image.url;
				}
			});
		}
		return url;
	}
}
