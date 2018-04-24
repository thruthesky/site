import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatSelectModule, MatSnackBarModule, MatSpinner,
  MatProgressSpinnerModule, MatDialogModule, MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatChipsModule
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
    MatNativeDateModule,
    MatChipsModule
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
    MatNativeDateModule,
    MatChipsModule
  ],
})
export class MaterialModule { }

