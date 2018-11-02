import { Injectable, ElementRef } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cover } from './cover.model';
import { ImageProcessing } from './imageprocessing.model';

@Injectable()
export class ImageService {

	formati = [
		{ id: 1, label: '800 x 600', width: 800, height: 600  },
		{ id: 2, label: '1024 x 768', width: 1024, height: 768  }
	];

	constructor(
		private httpClient: HttpClient
	) {

	}

	public buildCanvas(cover: Cover): Observable<string> {

		console.log('inizio immagine');
		const result = new Observable<string> (obs => {
			const processing = new ImageProcessing(cover);
			processing.obs = obs;
			this.process(processing);
		}
		);

		return result;
	}

	// process una immagine alla volta
	process(processing: ImageProcessing) {

		const toprocess = processing.toprocess.pop();
		console.log('processo', toprocess);

		const image = new Image();
		const that = this;
		image.onload = function() {
			that.processed(processing, image);
		};
		image.src = toprocess.url;

	}

	processed(processing: ImageProcessing, image) {

		processing.prog = processing.prog + 1;
		processing.ctx.drawImage(image, processing.getCurrentX() , processing.getCurrentY(), 80 , 80);

		console.log('processed: ' + processing.prog);
		if (processing.toprocess.length > 0) {
			this.process(processing);
		} else {
			processing.obs.next('finito');
		}

	}

}
