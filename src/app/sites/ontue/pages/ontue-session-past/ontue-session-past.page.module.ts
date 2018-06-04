import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { OntueSessionPastPage } from './ontue-session-past.page';
import { SessionListComponentModule } from '../../../../components/session-list/session-list.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';

const routes: Routes = [
  { path: '', component: OntueSessionPastPage }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    SessionListComponentModule,
    MaterialModule
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
