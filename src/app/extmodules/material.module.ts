import { MatToolbarModule, MatButtonModule, MatCardModule, MatSelectModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
	imports: [MatToolbarModule, MatButtonModule, MatSelectModule, MatIconModule, MatCardModule],
	exports: [MatToolbarModule, MatButtonModule, MatSelectModule, MatIconModule, MatCardModule],
})
export class MaterialModule { }
