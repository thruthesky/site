import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { KatalkEnglishCurriculumPage } from './katalkenglish-curriculum.page';

const routes: Routes = [
  { path: '', component: KatalkEnglishCurriculumPage }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
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
