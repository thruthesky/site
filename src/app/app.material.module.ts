import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatSelectModule, MatSnackBarModule, MatSpinner, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
})
export class MaterialModule { }

