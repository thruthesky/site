import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OntueHeaderComponent } from './ontue-header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    OntueHeaderComponent
  ],
  exports: [
    RouterModule,
    OntueHeaderComponent
  ],
  schemas: []
})
export class OntueHeaderComponentModule { }
