import { Injectable } from '@angular/core';
import { UserSession } from '../auth/usersession.model';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AppService {

	private user:UserSession;
	private obsUser: Observable<UserSession>;
	private observerUser;

	private statesource = new Subject<number>();


	public STATE_HOME = 0;
	public STATE_LISTS = 1;
	public STATE_OPTION = 2;
	public STATE_COVER = 3;
	private state = this.STATE_HOME;

	constructor () {
		this.obsUser = new Observable(observer => this.observerUser = observer);
	}

	public publishUser(newuser: UserSession) {
		this.user = newuser;
		this.observerUser.next(this.user);
	}

	public subscribeUser(): Observable<UserSession> {
		return this.obsUser;
	}

	public publishState(state: number) {
		console.log('publish state', state);
		this.state = state;
		this.statesource.next(this.state);
	}

	public subscribeState(): Observable<number> {
		return this.statesource.asObservable();
	}


}
