import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QnAPage } from './qna.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';

const routes: Routes = [
  { path: '', component: QnAPage }
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
    QnAPage
  ],
  entryComponents: [
    QnAPage
  ],
  bootstrap: [QnAPage],
  schemas: []
})
export class QnAPageModule { }
