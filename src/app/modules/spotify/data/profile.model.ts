import { Image } from './image.model';

export class Profile {
	public id?: string;
	public images?: Image[];
	public display_name?: string;
	public email?: string;
}
