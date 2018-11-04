import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserSession } from '../auth/usersession.model';
import { AppService } from '../common/app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'mm-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {

	public user: UserSession;
	public state: number = 0;
	private userSubscription: Subscription;
	private stateSubscription: Subscription;


	constructor(
		private appService: AppService,
		private router: Router,
	) {

	}

	ngOnInit() {
		this.userSubscription = this.appService.subscribeUser().subscribe(
			(res) => this.user = res
		);
		this.stateSubscription = this.appService.subscribeState().subscribe(
			(res) => {
				this.state = res;
				console.log('state published', res);
			}
		);

	}

	ngOnDestroy() {
		this.userSubscription.unsubscribe();
		this.stateSubscription.unsubscribe();
	}

	public goHome() {
		this.router.navigate(['home']);
	}
	public goPlaylists() {
		this.router.navigate(['playlists']);
	}
	public goOption() {
		this.router.navigate(['option']);
	}


}
