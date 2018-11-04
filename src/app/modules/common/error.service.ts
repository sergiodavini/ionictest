import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

	public handleError(error) {
		console.log('error', error);
	}

	public isTokenError(error): boolean {
		let esito = false;

		if (error !== undefined) {
			if (error.status === 401) {
				if (error.error !== undefined && error.error.error !== undefined) {
					const message = error.error.error.message;
					if (message === 'The access token expired') {
						esito = true;
					}
				}
			}
		}

		return esito;
	}
}
