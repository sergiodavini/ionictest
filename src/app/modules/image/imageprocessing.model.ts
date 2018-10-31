import { Cover } from './cover.model';
import { Subscriber } from 'rxjs';
import { Image } from '../spotify/data/image.model';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

export class ImageProcessing {

	public cover?: Cover;
	public obs?: Subscriber<string>;

	public toprocess: Image[] = [];
	public ctx: CanvasRenderingContext2D ;

	public width: number; // larghezza in pixel dell'immagine
	public height: number; // altezza in pixel dell'immagine
	public minbox: number;  // dimensione minima in pixel di una singola immagine;

	public boxcount: number;  // numero di box nell'immagine;

	public prog = 0;
	public count = 0;
	public rows: number;
	public cols: number;

	constructor(cover: Cover) {

		this.ctx = CanvasRenderingContext2D = cover.canvas.nativeElement.getContext('2d');
		this.width = cover.canvas.nativeElement.width;
		this.height = cover.canvas.nativeElement.height;
		this.minbox = 80;

		const maxboxcount = this.width * this.height / (this.minbox * this.minbox);
		const imagescount =  cover.images.length;

		// se il numero delle immagini supera il massimo , selezioni solo x immagini
		if (imagescount > maxboxcount) {
			this.boxcount = maxboxcount;
		} else {
			this.boxcount = maxboxcount;
		}

		this.rows = this.height / this.minbox;
		this.cols = this.width / this.minbox;

		console.log('devo caricare', this.boxcount );

		while (this.count < this.boxcount) {
			cover.images.forEach(url => {
				if (this.count < this.boxcount) {
					this.toprocess.push(url);
					this.count = this.count + 1;
				}
			});
		}

	}

	public getCurrentX(): number {
		const esito =  ( this.prog % this.cols ) * this.minbox;
		console.log('x', esito);
		return esito;
	}

	public getCurrentY(): number {
		const esito = ((this.prog / this.rows) - ((this.prog % this.cols) / this.rows)) * this.minbox ;
		console.log('y', esito);
		return esito;
	}

}
