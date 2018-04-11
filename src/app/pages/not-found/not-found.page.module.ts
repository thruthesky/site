import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { NotFoundPage } from './not-found.page';

const routes: Routes = [
  { path: '', component: NotFoundPage }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    NotFoundPage
  ],
  entryComponents: [
    NotFoundPage
  ],
  bootstrap: [NotFoundPage],
  schemas: []
})
export class NotFoundPageModule { }
