import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataComponent } from './data.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  declarations: [
    DataComponent
  ],
  exports: [
    RouterModule,
    DataComponent
  ],
  schemas: []
})
export class DataComponentModule { }

