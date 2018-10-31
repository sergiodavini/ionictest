import { ElementRef } from '@angular/core';
import { Image } from '../spotify/data/image.model';

export class Cover {

	public canvas?: ElementRef;
	public images: Image[] = [];

	public addImage(image: Image) {
		let found = false;
		this.images.forEach(img => {
			if (img.url === image.url) {
				found = true;
			}
		});
		if (!found) {
			this.images.push(image);
		}
	}

}
