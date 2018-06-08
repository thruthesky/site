import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleTablePage } from './schedule-table.page';
import { MaterialModule } from '../../app.material.module';
import { ScheduleTableOptionsComponent } from './schedule-table-option/schedule-table-options.component';
import { ScheduleTableProfileComponent } from './schedule-table-profile/schedule-table-profile.component';
import { LmsInfoComponentModule } from '../../components/lms-info/lms-info.component.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { ForumService } from '../../providers/forum.service';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';

const routes: Routes = [
  { path: '', component: ScheduleTablePage }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslatePipeModule,
    MaterialModule,
    LmsInfoComponentModule,
    ModalServiceModule
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
  providers: [
    ForumService
  ],
  bootstrap: [ScheduleTablePage],
  schemas: []
})
export class ScheduleTablePageModule { }
