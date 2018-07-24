import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OntueHomePage } from './ontue-home.page';
import { OntueReminderComponentModule } from '../../components/ontue-reminder/ontue-reminder.component.module';
import { OntueStatisticsComponentModule } from '../../components/ontue-statistics/ontue-statistics.component.module';
import { OntueStudentCommentListComponentModule } from '../../components/ontue-student-comment-list/ontue-student-comment-list.component.module';
import { OntueReservationLatestListComponentModule } from '../../components/ontue-reservation-latest-list/ontue-reservation-latest-list.component.module';
import { OntueGradedLatestListComponentModule } from '../../components/ontue-graded-latest-list/ontue-graded-latest-list.component.module';
import { OntueActivityLogComponentModule } from '../../components/ontue-activity-log/ontue-activity-log.component.module';
import { OntueHowToBeTeacherComponentModule } from '../../components/ontue-how-to-be-teacher/ontue-how-to-be-teacher.component.module';
import { OntueLeveltestGuidelineComponentModule } from '../../components/ontue-leveltest-guideline/ontue-leveltest-guideline.component.module';
import { OntueGuideAndTipsComponentModule } from '../../components/ontue-guide-and-tips/ontue-guide-and-tips.component.module';
import { OntueGradingSystemComponentModule } from '../../components/ontue-grading-system/ontue-grading-system.component.module';
import { OntueEvaluationLatestListComponentModule } from '../../components/ontue-evaluation-latest-list/ontue-evaluation-latest-list.component.module';
import { OntueHomeRemindersComponentModule } from '../../components/ontue-home-reminders/ontue-home-reminders.component.module';
import { ForumServiceModule } from '../../../../providers/forum/forum.service.module';
import { OntueStudentGreetingListComponentModule } from '../../components/ontue-student-greeting-list/ontue-student-greeting-list.component.module';
import { OntueStudentAuctionListComponentModule } from '../../components/ontue-student-auction-list/ontue-student-auction-list.component.module';

const routes: Routes = [
    {path: '', component: OntueHomePage}
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        OntueReminderComponentModule,
        OntueStatisticsComponentModule,
        OntueGradedLatestListComponentModule,
        OntueStudentCommentListComponentModule,
        OntueReservationLatestListComponentModule,
        OntueActivityLogComponentModule,
        OntueHowToBeTeacherComponentModule,
        OntueLeveltestGuidelineComponentModule,
        OntueGuideAndTipsComponentModule,
        OntueGradingSystemComponentModule,
        OntueEvaluationLatestListComponentModule,
        OntueHomeRemindersComponentModule,
        ForumServiceModule,
        OntueStudentGreetingListComponentModule,
        OntueStudentAuctionListComponentModule
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
