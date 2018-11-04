import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';
import { Playlist } from '../spotify/data/playlists.model';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../image/image.service';
import { Cover } from '../image/cover.model';
import { Image } from '../spotify/data/image.model';
import { AppService } from '../common/app.service';

@Component({
	selector: 'mm-cover',
	templateUrl: './cover.component.html',
	styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

	@ViewChild('myCanvas') canvashtml: ElementRef;

	playlist: Playlist;
	firstlink =  1;
	lastlink = 9;
	page = 1;
	maxpage = 1;
	lastpage = false;
	pagelimit = 50;
	id;
	idformat;
	format;

	constructor (
		private spotifyService: SpotifyService,
		private authService: AuthService,
		private errorService: ErrorService,
		private route: ActivatedRoute,
		private imageService: ImageService,
		private appService: AppService
	) {

	}

	public ngOnInit() {
		this.route.params.subscribe(params => {
			this.id = params['id'];
			this.idformat = params['format'];
			console.log('formato da leggere', this.idformat);
			this.format = this.imageService.getFormato(this.idformat);
			console.log('formato letto', this.format);
			this.appService.publishState(this.appService.STATE_COVER, this.id);
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
		this.canvashtml.nativeElement.width = this.format.width;
		this.canvashtml.nativeElement.height = this.format.height;

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
