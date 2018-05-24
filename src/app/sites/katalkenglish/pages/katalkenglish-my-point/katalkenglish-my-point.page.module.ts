import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KatalkEnglishMyPointPage } from './katalkenglish-my-point.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

const routes: Routes = [
  { path: '', component: KatalkEnglishMyPointPage }
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
    KatalkEnglishMyPointPage
  ],
  entryComponents: [
    KatalkEnglishMyPointPage
  ],
  bootstrap: [KatalkEnglishMyPointPage],
  schemas: []
})
export class KatalkEnglishMyPointPageModule { }
