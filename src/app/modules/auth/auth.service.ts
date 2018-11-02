import { Injectable } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { SpotifyToken } from '../spotify/spotify.token';
import { UserSession } from './usersession.model';



@Injectable()
export class AuthService {

	private user: UserSession;

	constructor(
		private spotifyService: SpotifyService
	) {
		console.log('auth service construct');
	}

	public getToken(): string {
		return this.token;
	}

	public login() {

		// non ho il token.. lo richiedo

		// ho il token richiedo 

		this.spotifyService.authorize();
	}

	public callback(fragment: string): boolean {

		let esito = false;

		const spotifytoken: SpotifyToken = this.spotifyService.callback(fragment);
		if (spotifytoken !== undefined ) {
			this.user = new UserSession();
			this.user.token = spotifytoken.access_token;
			this.user.refreshtoken = spotifytoken.refresh_token;
			esito = true;
		}

		return esito;

	}

	public islogged(): boolean {
		return (this.user !== undefined) ;
	}

}
