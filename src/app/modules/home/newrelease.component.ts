import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { checkNoChangesView } from '@angular/core/src/view/view';
import { Itemlist } from '../spotify/data/itemlist.model';
import { ErrorService } from '../common/error.service';

@Component({
	selector: 'mm-newrelease',
	templateUrl: './newrelease.component.html',
	styleUrls: ['./newrelease.component.css']
})
export class NewreleaseComponent implements OnInit {

	newrelease: Itemlist;
	firstlink =  1;
	lastlink = 9;
	page = 1;
	maxpage = 1;
	lastpage = false;
	pagelimit = 50;

	constructor (
		private spotifyService: SpotifyService,
		private authService: AuthService,
		private errorService: ErrorService
	) {

	}

	public ngOnInit() {
		this.listNewReleases(1);
	}

	public listNewReleases(page) {

		const offset: number = (page - 1) * this.pagelimit;
		const token: string = this.authService.getToken();
		this.spotifyService.listNewReleases(token, offset, this.pagelimit).subscribe(
			(res) => this.onListSuccess(res),
			(res) => this.onError(res)
		);
	}

	onListSuccess(res) {

		this.newrelease = res.body;
		const albums = this.newrelease.albums;

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

	onDetailSuccess(list: Itemlist, res) {

		this.newrelease = list;
		console.log(res);

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

}
