import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KatalkEnglishCurriculumPage } from './katalkenglish-curriculum.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

const routes: Routes = [
  { path: '', component: KatalkEnglishCurriculumPage }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslatePipeModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
      KatalkEnglishCurriculumPage
  ],
  entryComponents: [
      KatalkEnglishCurriculumPage
  ],
  bootstrap: [KatalkEnglishCurriculumPage],
  schemas: []
})
export class KatalkEnglishCurriculumPageModule { }
