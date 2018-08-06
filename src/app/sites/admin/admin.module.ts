import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHomePage } from './pages/admin-home/admin-home.page';
import { AdminLayoutPage } from './pages/admin-layout/admin-layout.page';
import { AdminLoginPage } from './pages/admin-login/admin-login.page';
import { AdminPaymentPage } from './pages/admin-payment/admin-payment.page';
import { AdminPointHistoryPage } from './pages/admin-point-history/admin-point-history.page';
import { AdminPointRefundPage } from './pages/admin-point-refund/admin-point-refund.page';
import { AdminPushNotificationPage } from './pages/admin-push-notification/admin-push-notification.page';
import { AdminSessionPage } from './pages/admin-session/admin-session.page';
import { AdminSettingPage } from './pages/admin-setting/admin-setting.page';
import { AdminUserPage } from './pages/admin-user/admin-user.page';
import { AdminUserInfoPage } from './pages/admin-user-info/admin-user-info.page';
import { MaterialModule } from '../../app.material.module';
import { XapiFileUploadComponentModule } from '../../components/xapi-file-upload/xapi-file-upload.component.module';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { AdminSessionEditPage } from './pages/admin-session-edit/admin-session-edit.page';
import { ForumServiceModule } from '../../providers/forum/forum.service.module';
import { AdminScheduleTablePage } from './pages/admin-schedule-table/admin-schedule-table.page';
import { AdminMenuPage } from './pages/admin-menu/admin-menu.page';
import { AdminNoOfUserPerEachDomainPage } from './pages/admin-no-of-user-per-each-domain/admin-no-of-user-per-each-domain.page';
import { AdminStatisticGraphPage } from './pages/admin-statistic-graph/admin-statistic-graph.page';
import { AdminBranchListPage } from './pages/admin-branch-list/admin-branch-list.page';
import { AdminBranchTeachersPage } from './pages/admin-branch-teachers/admin-branch-teachers.page';

// COMPONENT
import { AdminBranchEditComponent } from './components/admin-branch-edit/admin-branch-edit.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminMessageListPage } from './pages/admin-message-list/admin-message-list.page';
import { AdminUserPaymentInformationListPage } from './pages/admin-user-payment-information-list/admin-user-payment-information-list.page';
import { AdminStudentReservationPage } from './pages/admin-student-reservation/admin-student-reservation.page';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutPage,
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: AdminHomePage
            },
            { path: 'login', component: AdminLoginPage },
            { path: 'payment', component: AdminPaymentPage },
            { path: 'payment/:ID', component: AdminPaymentPage },
            { path: 'point-history', component: AdminPointHistoryPage },
            { path: 'point-refund', component: AdminPointRefundPage },
            { path: 'point-refund/:field/:value', component: AdminPointRefundPage },
            { path: 'push-notification', component: AdminPushNotificationPage },
            { path: 'session', component: AdminSessionPage },
            { path: 'session/:type/:ID', component: AdminSessionPage },
            { path: 'session-edit/:idx', component: AdminSessionEditPage },
            { path: 'setting', component: AdminSettingPage },
            { path: 'user/:field/:value', component: AdminUserPage },
            { path: 'user', component: AdminUserPage },
            { path: 'user-info/:ID', component: AdminUserInfoPage },
            { path: 'schedule-table/:ID', component: AdminScheduleTablePage },
            { path: 'menu', component: AdminMenuPage},
            { path: 'no-of-student-per-each-domain', component: AdminNoOfUserPerEachDomainPage},
            { path: 'statistic-graph', component: AdminStatisticGraphPage},
            { path: 'branch-list', component: AdminBranchListPage},
            { path: 'branch-teachers', component: AdminBranchTeachersPage},
            { path: 'message-list', component: AdminMessageListPage},
            { path: 'student-reservation', component: AdminStudentReservationPage},
            { path: 'user-payment-information/:ID', component: AdminUserPaymentInformationListPage },
            { path: 'user-payment-information', component: AdminUserPaymentInformationListPage }
        ]
    }

];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ModalServiceModule,
        XapiFileUploadComponentModule,
        TranslatePipeModule,
        ForumServiceModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AdminLayoutPage,
        AdminHomePage,
        AdminLoginPage,
        AdminPaymentPage,
        AdminPointHistoryPage,
        AdminPointRefundPage,
        AdminPushNotificationPage,
        AdminSessionPage,
        AdminSettingPage,
        AdminUserPage,
        AdminUserInfoPage,
        AdminSessionEditPage,
        AdminSidebarComponent,
        AdminScheduleTablePage,
        AdminMenuPage,
        AdminNoOfUserPerEachDomainPage,
        AdminStatisticGraphPage,
        AdminBranchListPage,
        AdminBranchTeachersPage,
        AdminBranchEditComponent,
        AdminMessageListPage,
        AdminUserPaymentInformationListPage,
        AdminStudentReservationPage
    ],
    entryComponents: [
        AdminLayoutPage,
        AdminHomePage,
        AdminLoginPage,
        AdminPaymentPage,
        AdminPointHistoryPage,
        AdminPointRefundPage,
        AdminPushNotificationPage,
        AdminSessionPage,
        AdminSettingPage,
        AdminUserPage,
        AdminUserInfoPage,
        AdminSessionEditPage,
        AdminScheduleTablePage,
        AdminMenuPage,
        AdminNoOfUserPerEachDomainPage,
        AdminStatisticGraphPage,
        AdminBranchListPage,
        AdminBranchTeachersPage,
        AdminMessageListPage,
        AdminUserPaymentInformationListPage,
        AdminStudentReservationPage
    ],
    providers: [],
    bootstrap: [AdminLayoutPage],
    schemas: []
})
export class AdminModule { }
