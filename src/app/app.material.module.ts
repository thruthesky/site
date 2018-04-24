import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatSelectModule, MatSnackBarModule, MatSpinner,
  MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
})
export class MaterialModule { }

