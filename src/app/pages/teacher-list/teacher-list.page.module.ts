import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherListPage } from './teacher-list.page';
import { MaterialModule } from '../../app.material.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';



const routes: Routes = [
  { path: '', component: TeacherListPage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    MaterialModule
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
