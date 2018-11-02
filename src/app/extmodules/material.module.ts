import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [MatToolbarModule, MatButtonModule],
	exports: [MatToolbarModule, MatButtonModule],
})
export class MaterialModule { }
