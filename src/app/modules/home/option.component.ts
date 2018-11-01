import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';
import { Playlist } from '../spotify/data/playlists.model';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../image/image.service';
import { Cover } from '../image/cover.model';
import { Image } from '../spotify/data/image.model';

@Component({
	selector: 'mm-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

	@ViewChild('myCanvas') canvashtml: ElementRef;

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
		private imageService: ImageService
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

		const cover = new Cover();
		cover.canvas = this.canvashtml;

		const urls = [];
		this.playlist.tracks.items.forEach(item => {
				const image = this.getImage(item.track.album);
				cover.addImage(image);
			}
		);

		this.imageService.buildCanvas(cover).subscribe(
			(resp) => this.imageProcessed(resp)
		);
		console.log('sono qui');
	}

	imageProcessed(res) {
		console.log('immagine finita', res);
	}

	onError(res) {
		this.errorService.handleError(res);
	}

	getImage(item): Image {

		let result;

		let size = 999999;
		if (item.images !== undefined) {
			item.images.forEach(image => {
				if (image.width < size) {
					size = image.width;
					result = image;
				}
			});
		}

		return result;
	}
}
