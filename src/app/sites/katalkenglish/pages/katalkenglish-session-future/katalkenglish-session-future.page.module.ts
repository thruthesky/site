import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { KatalkEnglishSessionFuturePage } from './katalkenglish-session-future.page';
import { SessionListComponentModule } from '../../../../components/session-list/session-list.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

const routes: Routes = [
  { path: '', component: KatalkEnglishSessionFuturePage }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    SessionListComponentModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    KatalkEnglishSessionFuturePage
  ],
  entryComponents: [
    KatalkEnglishSessionFuturePage
  ],
  bootstrap: [KatalkEnglishSessionFuturePage],
  schemas: []
})
export class KatalkEnglishSessionFuturePageModule { }
