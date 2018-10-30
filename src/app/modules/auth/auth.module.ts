import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SpotifyService } from '../spotify/spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { CallbackComponent } from './callback.component';

@NgModule({
	declarations: [
		LoginComponent,
		CallbackComponent
	],
	imports: [
		HttpClientModule
	],
	providers: [
		AuthService,
		AuthGuard,
		SpotifyService
	],
	bootstrap: []
})
export class AuthModule { }
