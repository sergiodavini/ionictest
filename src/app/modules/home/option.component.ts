import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SpotifyService } from '../spotify/spotify.service';
import { ErrorService } from '../common/error.service';
import { Playlist } from '../spotify/data/playlists.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../image/image.service';
import { Cover } from '../image/cover.model';
import { Image } from '../spotify/data/image.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from '../common/app.service';

@Component({
	selector: 'mm-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {

	@ViewChild('myCanvas') canvashtml: ElementRef;

	id;
	formati;
    form: FormGroup;


	constructor (
		private spotifyService: SpotifyService,
		private appService: AppService,
		private formBuilder: FormBuilder,
		private errorService: ErrorService,
		private route: ActivatedRoute,
		private router: Router,
		private imageService: ImageService
	) {

	}

	public ngOnInit() {
		this.form = this.formBuilder.group({
			format: ['']
		});

		this.route.params.subscribe(params => {
			this.id = params['id'];
		});
		this.formati = this.imageService.formati;
		this.appService.publishState(this.appService.STATE_OPTION);

	}

	onError(res) {
		this.errorService.handleError(res);
	}

	confirm() {
		this.router.navigate(['cover/' + this.id + '/' + this.form.value.format.id]);
	}

}
