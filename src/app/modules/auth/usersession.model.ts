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
		return  this.token != undefined && date < this.expires;
	}
}


