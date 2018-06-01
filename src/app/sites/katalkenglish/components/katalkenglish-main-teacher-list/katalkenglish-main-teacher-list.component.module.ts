import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { KatalkEnglishMaiTeacherListComponent } from './katalkenglish-main-teacher-list.component';
import { MaterialModule } from '../../../../app.material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslatePipeModule,
    MaterialModule
  ],
  declarations: [
      KatalkEnglishMaiTeacherListComponent
  ],
  exports: [
    RouterModule,
    KatalkEnglishMaiTeacherListComponent
  ],
  schemas: []
})
export class KatalkEnglishMaiTeacherListComponentModule { }
