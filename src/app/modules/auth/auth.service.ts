import { Injectable } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { UserSession } from './usersession.model';
import { SpotifyToken } from '../spotify/data/spotify.token';
import { AppService } from '../common/app.service';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';



@Injectable()
export class AuthService {

	// gli stati possibili sono:
	// 1) nessun token
	// 2) token scaduto
	// 3) token valido ma manca profilo
	// 4) tutto completo

	private user: UserSession;
	private KEY = 'user.session.spotify';

	constructor(

		private spotifyService: SpotifyService,
		private appService: AppService
	) {
		console.log('auth service construct');

		this.user = this.loadUserFromStorage();
		if (this.user !== undefined) {
			this.appService.publishUser(this.user);
		}

	}

	private loadUserFromStorage(): UserSession {
		
		let user: UserSession;

		const json = localStorage.getItem(this.KEY);
		console.log('json loaded', json);
		if (json !== undefined && json !== null) {
			const obj = JSON.parse(json);
			user = new UserSession();
			user.name = obj.name;
			user.refreshtoken = obj.refreshtoken;
			user.token = obj.token;
			user.expires = new Date(obj.expires);
			console.log('user from storage', user);
		}

		return user;
	}

	private saveUserFromStorage(user: UserSession) {
		const json = JSON.stringify(user);
		localStorage.setItem(this.KEY, json);
	}

	public getUser(): Promise<UserSession> {

		const result = new Promise<UserSession> ((resolve, reject) => {
		
			// recupero l'utente dallo storage
			let user: UserSession = this.getUserSession();

			// non c'è utente.. login
			if (user == null) {
				this.login();
				reject('not logged');
			} else if (!user.isValidSession()) {
				this.login();
				resolve(user);
			} else {
				resolve(user);
			}

		});

		return result;
	}

	public getUserSession(): UserSession {
		return this.user;
	}

	public getToken(): string {
		return this.user.token;
	}

	public checkAccess():boolean {

		// non ho il token.. lo richiedo
		if (this.user === undefined) {
			this.login();
		}
		
		// ho il token richiedo 
		return true;
		
	}

	public login() {
		this.spotifyService.authorize();
	}

	public callback(fragment: string): Promise<UserSession> {
		
		const result = new Promise<UserSession> ((resolve, reject) => {

			const spotifytoken: SpotifyToken = this.spotifyService.callback(fragment);
			if (spotifytoken !== undefined ) {
				this.loadProfile(resolve, reject, spotifytoken);
			} else {
				reject('not logged');
			}
		});

		return result;

	}

	private loadProfile(resolve, reject, spotifytoken: SpotifyToken) {

		const user = new UserSession();
		user.token = spotifytoken.access_token;
		user.refreshtoken = spotifytoken.refresh_token;
		const date = new Date();
		console.log('adesso è ', date);
		date.setMinutes(date.getMinutes() + 55);
		user.expires = date;
		console.log('il token scade a ', date);

		this.spotifyService.getProfile(user.token).subscribe(
			(res) => {
				user.name = res.body.display_name;
				this.user = user;
				this.saveUserFromStorage(user);
				this.appService.publishUser(this.user);
				resolve(this.user);
			},
			(res) => reject('not profile')
		);

	}

	public islogged(): boolean {
		// per essere loggato deve avere un token
		return (this.user !== undefined && this.user.isValidSession())  ;
	}

}
