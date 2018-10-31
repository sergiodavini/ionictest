import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SpotifyToken } from './spotify.token';



@Injectable()
export class SpotifyService {

	constructor(private http: HttpClient) { }

	authorize() {
		const url = new URL('https://accounts.spotify.com/authorize');
		// const params: URLSearchParams = new URLSearchParams();
		url.searchParams.set('client_id', environment.clientid);
		url.searchParams.set('response_type', 'token');
		url.searchParams.set('redirect_uri', environment.redirecturi);
		url.searchParams.set('state', 'RANDOM');
		url.searchParams.set('scope', 'user-read-private user-read-email playlist-read-private');
		window.location.href = url.href;
	}

	public callback(fragment: string): SpotifyToken {

		const token = new SpotifyToken();

		const params = fragment.split('&');
		params.forEach(param => {
			const values = fragment.split('=');
			if (values[0] === 'access_token') {
				token.access_token = values[1];
			} else if (values[0] === 'token_type') {
				token.token_type = values[1];
			} else if (values[0] === 'expires_in') {
				token.expires_in = values[1];
			} else if (values[0] === 'state') {
			}
		});

		return token;
	}

	token(): Observable<HttpResponse<SpotifyToken>> {
		const params: HttpParams = new HttpParams()
			.set('client_id', environment.clientid)
			.set('redirect_uri', environment.redirecturi)
			.set('state', 'RANDOM')
			.set('scope', 'user-read-private user-read-email');
		return this.http.post<SpotifyToken>('https://accounts.spotify.com/api/token', null, { observe: 'response' });
	}

	listNewReleases(token: string, offset: number, limit: number): Observable<HttpResponse<String>> {
		// const params: HttpParams = new HttpParams();
		let hd = new HttpHeaders();
		hd = hd.append('Authorization', `Bearer ${token}`);

		let params = new HttpParams();
		params = params.append('limit', limit.toString());
		params = params.append('offset', offset.toString());
		return this.http.get<String>('https://api.spotify.com/v1/browse/new-releases', { observe: 'response', headers: hd, params: params });

	}

	listPlaylists(token: string, offset: number, limit: number): Observable<HttpResponse<String>> {
		// const params: HttpParams = new HttpParams();
		let hd = new HttpHeaders();
		hd = hd.append('Authorization', `Bearer ${token}`);

		let params = new HttpParams();
		params = params.append('limit', limit.toString());
		params = params.append('offset', offset.toString());
		return this.http.get<String>('https://api.spotify.com/v1/me/playlists', { observe: 'response', headers: hd, params: params });

	}

	getPlaylist(token: string, id: string): Observable<HttpResponse<String>> {
		// const params: HttpParams = new HttpParams();
		let hd = new HttpHeaders();
		hd = hd.append('Authorization', `Bearer ${token}`);

		return this.http.get<String>('https://api.spotify.com/v1/playlists/' + id, { observe: 'response', headers: hd });

	}


	detailArtists(token: string, ids: string[]): Observable<HttpResponse<String>> {
		// const params: HttpParams = new HttpParams();
		let hd = new HttpHeaders();
		hd = hd.append('Authorization', `Bearer ${token}`);

		const params = new HttpParams();
		// params = params.append('country', 'IT');
		return this.http.get<String>('https://api.spotify.com/v1/browse/new-releases', { observe: 'response', headers: hd, params: params });

	}

}
