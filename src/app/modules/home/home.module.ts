import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { NewreleaseComponent } from './newrelease.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '../common/common.module';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistComponent } from './playlist.component';

@NgModule({
	declarations: [
		HomeComponent,
		NewreleaseComponent,
		PlaylistComponent,
		PlaylistsComponent
	],
	imports: [
		BrowserModule,
		CommonModule
	],
	providers: [],
	bootstrap: []
})
export class HomeModule { }
