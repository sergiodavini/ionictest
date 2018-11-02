import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/extmodules/material.module';

@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
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
