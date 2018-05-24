import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

import { KatalkEnglishSessionPastPage } from './katalkenglish-session-past.page';
import { SessionListComponentModule } from '../../../../components/session-list/session-list.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

const routes: Routes = [
  { path: '', component: KatalkEnglishSessionPastPage }
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
    KatalkEnglishSessionPastPage
  ],
  entryComponents: [
    KatalkEnglishSessionPastPage
  ],
  bootstrap: [KatalkEnglishSessionPastPage],
  schemas: []
})
export class KatalkEnglishSessionPastPageModule { }

