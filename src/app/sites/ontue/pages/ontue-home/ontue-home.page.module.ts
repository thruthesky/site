import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OntueHomePage } from './ontue-home.page';
import { OntueReminderComponentModule } from '../../components/ontue-reminder/ontue-reminder.component.module';
import { OntueStatisticsComponentModule } from '../../components/ontue-statistics/ontue-statistics.component.module';
import { OntueStudentCommentListComponentModule } from '../../components/ontue-student-comment-list/ontue-student-comment-list.component.module';
import { OntueReservationLatestListComponentModule } from '../../components/ontue-reservation-latest-list/ontue-reservation-latest-list.component.module';
import { OntueGradedLatestListComponentModule } from '../../components/ontue-graded-latest-list/ontue-graded-latest-list.component.module';
import { OntueActivityLogComponentModule } from '../../components/ontue-activity-log/ontue-activity-log.component.module';

const routes: Routes = [
    {path: '', component: OntueHomePage}
];
@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        OntueReminderComponentModule,
        OntueStatisticsComponentModule,
        OntueGradedLatestListComponentModule,
        OntueStudentCommentListComponentModule,
        OntueReservationLatestListComponentModule,
        OntueActivityLogComponentModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueHomePage
    ],
    entryComponents: [
        OntueHomePage
    ],
    bootstrap: [OntueHomePage],
    schemas: []
})
export class OntueHomePageModule {
}
