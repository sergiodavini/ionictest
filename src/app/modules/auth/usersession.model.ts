import { getLocaleExtraDayPeriodRules } from "@angular/common";

export class User {

}
export class UserSession {

	public token?: string;
	public refreshtoken?: string;
	public name?: string;
	public expires?: Date;

	public isValidSession(): boolean {
		const date = new Date();
		console.log('isValid', this.token);
		console.log('isValid', date);
		console.log('isValid', this.expires);
		console.log('isValid', date < this.expires);
		return  this.token != undefined && date < this.expires;
	}
}


