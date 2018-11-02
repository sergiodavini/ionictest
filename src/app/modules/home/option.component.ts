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

	id;
	formati;

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
		this.formati = this.imageService.formati;
	}

	onError(res) {
		this.errorService.handleError(res);
	}

}
