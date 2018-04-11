import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OntueHomePage } from './ontue-home.page';

const routes: Routes = [
  { path: '', component: OntueHomePage }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    OntueHomePage
  ],
  entryComponents: [
    OntueHomePage
  ],
  bootstrap: [OntueHomePage],
  schemas: []
})
export class OntueHomePageModule { }
