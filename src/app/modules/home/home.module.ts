import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { NewreleaseComponent } from './newrelease.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '../common/common.module';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistComponent } from './playlist.component';
import { ImageService } from '../image/image.service';
import { CoverComponent } from './cover.component';
import { OptionComponent } from './option.component';
import { MaterialModule } from 'src/app/extmodules/material.module';

@NgModule({
	declarations: [
		HomeComponent,
		NewreleaseComponent,
		PlaylistComponent,
		PlaylistsComponent,
		CoverComponent,
		OptionComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		MaterialModule
	],
	providers: [
		ImageService
	],
	bootstrap: []
})
export class HomeModule { }
