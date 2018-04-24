import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ScheduleTablePage } from './schedule-table.page';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';

const routes: Routes = [
  { path: '', component: ScheduleTablePage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ScheduleTablePage
  ],
  entryComponents: [
    ScheduleTablePage
  ],
  bootstrap: [ScheduleTablePage],
  schemas: []
})
export class ScheduleTablePageModule { }
