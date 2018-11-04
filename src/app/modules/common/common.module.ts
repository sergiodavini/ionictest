import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AppService } from './app.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
	],
	imports: [
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		ReactiveFormsModule
	],
	providers: [
		ErrorService,
		AppService
	],
	bootstrap: []
})
export class CommonModule { }
