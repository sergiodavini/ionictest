import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {

	public handleError(error) {
		console.log('error', error);
	}
}
