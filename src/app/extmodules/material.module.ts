import { MatToolbarModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [MatToolbarModule, MatButtonModule, MatSelectModule, MatIconModule],
	exports: [MatToolbarModule, MatButtonModule, MatSelectModule, MatIconModule],
})
export class MaterialModule { }
