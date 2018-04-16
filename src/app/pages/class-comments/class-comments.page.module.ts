import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { ClassComponentsPage } from './class-comments.page';

const routes: Routes = [
  { path: '', component: ClassComponentsPage }
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
    ClassComponentsPage
  ],
  entryComponents: [
    ClassComponentsPage
  ],
  bootstrap: [ClassComponentsPage],
  schemas: []
})
export class ClassCommentsPageModule { }

