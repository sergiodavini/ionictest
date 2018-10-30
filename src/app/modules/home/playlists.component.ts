import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';
import { Playlists, Playlist } from '../spotify/data/playlists.model';
import { Router } from '@angular/router';

@Component({
	selector: 'mm-playlists',
	templateUrl: './playlists.component.html',
	styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

	playlists: Playlists;
	firstlink =  1;
	lastlink = 9;
	page = 1;
	maxpage = 1;
	lastpage = false;
	pagelimit = 50;

	constructor (
		private spotifyService: SpotifyService,
		private authService: AuthService,
		private errorService: ErrorService,
		private route: Router
	) {

	}

	public ngOnInit() {
		this.listNewReleases(1);
	}

	public listNewReleases(page) {

		const offset: number = (page - 1) * this.pagelimit;
		const token: string = this.authService.getToken();
		this.spotifyService.listPlaylists(token, offset, this.pagelimit).subscribe(
			(res) => this.onListSuccess(res),
			(res) => this.onError(res)
		);
	}

	onListSuccess(res) {

		this.playlists = res.body;
		const albums = this.playlists;

		this.maxpage = albums.total / albums.limit;
		if (albums.offset === 0) {
			this.page = 1;
		} else {
			this.page = albums.offset / albums.limit + 1;
		}

		if (this.maxpage > 5) {
			if (this.page < 4) {
				this.firstlink = 1;
				this.lastlink = 5;
			} else {
				this.firstlink = this.page - 2;
				this.lastlink = this.firstlink + 4;
			}
		} else {
			this.firstlink = 1;
			this.lastlink = this.maxpage;
		}

	}


	onError(res) {
		this.errorService.handleError(res);
	}

	goPagePrevious() {
		if (this.page > 1) {
			this.goPage(this.page - 1);
		}
	}

	goPageNext() {
		if (this.page < this.maxpage) {
			this.goPage(this.page + 1);
		}
	}

	goPage(num) {
		if (num !== this.page) {
			this.listNewReleases(num);
		}
	}

	goPlaylist(item: Playlist) {
		this.route.navigate(['playlist/' +  item.id]);
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
}
