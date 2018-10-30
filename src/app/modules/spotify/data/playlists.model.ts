
import { Exturl } from './exturl.model';
import { Image } from './image.model';
import { Item } from './item.model';

export class Playlists {
	public href?: string;
	public items?: Playlist[];
	public limit?: number;
	public next?: string;
	public offset?: number;
	public previous?: string;
	public total: number;
}

export class Playlist {
	public collaborative?: boolean;
	public external_urls?: Exturl;
	public href?: string;
	public id?: string;
	public images?: Image[];
	public name?: string;
	public primary_color?: string;
	public public?: boolean;
	public snapshot_id?: string;

	public tracks?: Tracks;
	public type?: string;
	public uri?: string;
}

export class Tracks {
	public href?: string;
	public total?: number;
	public items?: Item[];
}
