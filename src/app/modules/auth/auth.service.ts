import { Injectable } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { SpotifyToken } from '../spotify/spotify.token';


@Injectable()
export class AuthService {

	private name: string;
	private token: string;

	constructor(
		private spotifyService: SpotifyService
	) {
		this.token = localStorage.getItem('auth.mm.token');
	}

	public getToken(): string {
		return this.token;
	}
	public login(name: string) {
		this.spotifyService.authorize();
	}

	public callback(fragment: string): boolean {

		let esito = false;

		const spotifytoken: SpotifyToken = this.spotifyService.callback(fragment);
		if (spotifytoken !== undefined ) {
			this.token = spotifytoken.access_token;
			esito = true;
		}

		localStorage.setItem('auth.mm.token', this.token);
		return esito;
	}


	public islogged(): boolean {
		return (this.token !== undefined) && (this.token !== null);
	}

}
