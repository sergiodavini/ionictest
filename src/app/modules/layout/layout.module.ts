import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
		RouterModule
	],
	exports: [
		LayoutComponent
	],
	providers: [],
	bootstrap: []
})
export class LayoutModule { }
