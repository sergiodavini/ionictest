import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/extmodules/material.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		MaterialModule
	],
	exports: [
		LayoutComponent
	],
	providers: [],
	bootstrap: []
})
export class LayoutModule { }
