import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { OntueHomePage } from './ontue-home.page';
import { OntueReminderComponentModule } from '../../components/ontue-reminder/ontue-reminder.component.module';
import { OntueStatisticsComponentModule } from '../../components/ontue-statistics/ontue-statistics.component.module';
import { OntueGradedListComponentModule } from '../../components/ontue-graded-list/ontue-graded-list.component.module';

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
        OntueGradedListComponentModule,
        OntueStudentCommentListComponentModule
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
