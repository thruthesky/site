import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

import { OntueSessionPastPage } from './ontue-session-past.page';
import { SessionListComponentModule } from '../../../../components/session-list/session-list.component.module';

const routes: Routes = [
  { path: '', component: OntueSessionPastPage }
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
    OntueSessionPastPage
  ],
  entryComponents: [
    OntueSessionPastPage
  ],
  bootstrap: [OntueSessionPastPage],
  schemas: []
})
export class OntueSessionPastPageModule { }
