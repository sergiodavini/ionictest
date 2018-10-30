import { Item } from './item.model';

export class Itemlist {
	public albums?: AlbumList;
}

export class AlbumList {
	public href?: string;
	public items?: Item[];
	public limit?: number;
	public next?: string;
	public offset?: number;
	public previous?: string;
	public total: number;
}
