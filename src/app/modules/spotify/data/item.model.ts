import { Image } from './image.model';
import { Exturl } from './exturl.model';
import { Artist } from './artist.model';

export class Item {

	public album_type?: string;
	public name?: string;
	public release_date?: string;
	public release_date_precision?: string;
	public total_tracks?: number;
	public type?: string;
	public uri?: string;
	public href?: string;
	public id?: string;
	public artists?: Artist[];
	public external_urls?: Exturl;
	public images?: Image[];

}

