import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatRadioModule,
  MatTooltipModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTooltipModule,
    MatTabsModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTooltipModule,
    MatTabsModule,
  ],
})
export class MaterialModule { }

