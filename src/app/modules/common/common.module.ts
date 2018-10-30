import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './error.service';

@NgModule({
	declarations: [
	],
	imports: [
		HttpClientModule
	],
	providers: [
		ErrorService
	],
	bootstrap: []
})
export class CommonModule { }
