import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


import { OntueSessionFuturePage } from './ontue-session-future.page';
import { SessionListComponentModule } from '../../../../components/session-list/session-list.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
// import { MaterialModule } from '../../../../app.material.module';
// import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

const routes: Routes = [
  { path: '', component: OntueSessionFuturePage }
];
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    SessionListComponentModule,
    // MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    OntueSessionFuturePage
  ],
  entryComponents: [
    OntueSessionFuturePage
  ],
  bootstrap: [OntueSessionFuturePage],
  schemas: []
})
export class OntueSessionFuturePageModule { }
