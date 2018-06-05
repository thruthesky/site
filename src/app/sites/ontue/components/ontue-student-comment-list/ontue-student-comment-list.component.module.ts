import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../app.material.module';

import { OntueStudentCommentListComponent } from './ontue-student-comment-list.component';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslatePipeModule
  ],
  declarations: [
      OntueStudentCommentListComponent
  ],
  exports: [
    RouterModule,
      OntueStudentCommentListComponent
  ],
  schemas: []
})
export class OntueStudentCommentListComponentModule { }

