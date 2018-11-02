import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/auth/login.component';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { CallbackComponent } from './modules/auth/callback.component';
import { NewreleaseComponent } from './modules/home/newrelease.component';
import { PlaylistComponent } from './modules/home/playlist.component';
import { PlaylistsComponent } from './modules/home/playlists.component';
import { CoverComponent } from './modules/home/cover.component';
import { OptionComponent } from './modules/home/option.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './extmodules/material.module';

const mmRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'newrelease', component: NewreleaseComponent, canActivate: [AuthGuard] },
	{ path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
	{ path: 'playlist/:id', component: PlaylistComponent, canActivate: [AuthGuard] },
	{ path: 'option/:id', component: OptionComponent, canActivate: [AuthGuard] },
	{ path: 'cover/:id', component: CoverComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'callback', component: CallbackComponent },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
];


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(mmRoutes),
		BrowserAnimationsModule,
		LayoutModule,
		HomeModule,
		AuthModule
	],
	providers: [],
	exports: [
		RouterModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
