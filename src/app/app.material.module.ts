import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule
  ],
})
export class MaterialModule { }

