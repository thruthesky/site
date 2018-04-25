import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ScheduleTablePage } from './schedule-table.page';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ScheduleTableOptionsComponent } from './schedule-table-option/schedule-table-options.component';
import { ScheduleTableProfileComponent } from './schedule-table-profile/schedule-table-profile.component';
import { LmsInfoComponentModule } from '../../components/lms-info/lms-info.component.module';

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
    MaterialModule,
    LmsInfoComponentModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ScheduleTablePage,
    ScheduleTableOptionsComponent,
    ScheduleTableProfileComponent
  ],
  entryComponents: [
    ScheduleTablePage
  ],
  bootstrap: [ScheduleTablePage],
  schemas: []
})
export class ScheduleTablePageModule { }
