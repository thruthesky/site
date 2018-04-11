import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


import { TeacherListPage } from './teacher-list.page';



const routes: Routes = [
  { path: '', component: TeacherListPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    TeacherListPage
  ],
  entryComponents: [
    TeacherListPage
  ],
  bootstrap: [TeacherListPage],
  schemas: []
})
export class TeacherListPageModule { }
