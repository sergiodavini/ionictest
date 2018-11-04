import { MatToolbarModule, MatButtonModule, MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [MatToolbarModule, MatButtonModule, MatSelectModule],
	exports: [MatToolbarModule, MatButtonModule, MatSelectModule],
})
export class MaterialModule { }
