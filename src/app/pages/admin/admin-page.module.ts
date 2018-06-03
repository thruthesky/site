import { NgModule } from '@angular/core';
import { AdminHomePage } from './home/admin-home.page';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PointRefundPage } from './point-refund/point-refund.page';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';
import { PointHistoryPage } from './point-history/point-history.page';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { AdminPaymentPage } from './payment/admin-payment.page';
// import { UserInfoComponentModule } from '../../components/user-info/user-info.component.module';
import { UserPage } from './user/user.page';
import { SessionPage } from './session/session.page';
import { UserInfoPage } from './user-info/user-info.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { PushNotificationPage } from './push-notification/push-notification.page';
import { SettingsPage } from './settings/settings.page';
import { SessionEditPage } from './session-edit/session-edit.page';


const appRoutes: Array<Route> = [
    { path: 'session-edit/:idx', component: SessionEditPage },
    { path: 'settings', component: SettingsPage },
    { path: 'push-notification', component: PushNotificationPage },
    { path: 'point-refund/:field/:value', component: PointRefundPage },
    { path: 'point-refund', pathMatch: 'full', component: PointRefundPage },
    { path: 'point-history', pathMatch: 'full', component: PointHistoryPage },
    { path: 'payment', pathMatch: 'full', component: AdminPaymentPage },
    { path: 'payment/:ID', component: AdminPaymentPage },
    { path: 'session', pathMatch: 'full', component: SessionPage },
    { path: 'session/:type/:ID', component: SessionPage },
    { path: 'user/:field/:value', component: UserPage },
    { path: 'user', pathMatch: 'full', component: UserPage },
    { path: 'user-info/:ID', pathMatch: 'full', component: UserInfoPage },
    { path: 'front', pathMatch: 'full', component: AdminHomePage },
    { path: '', pathMatch: 'full', component: UserPage }
];
@NgModule({
    declarations: [
        AdminHomePage,
        PointRefundPage,
        AdminHeaderComponent,
        PointHistoryPage,
        AdminPaymentPage,
        UserPage,
        SessionPage,
        UserInfoPage,
        PushNotificationPage,
        SettingsPage,
        SessionEditPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild( appRoutes ),
        TranslatePipeModule,
        // UserInfoComponentModule
    ],
    entryComponents: [
        AdminHomePage,
        PointRefundPage,
        PointHistoryPage,
        AdminPaymentPage,
        UserPage,
        SessionPage,
        UserInfoPage,
        PushNotificationPage
    ],
    bootstrap: [
        AdminHomePage
    ]
})
export class AdminPageModule {}
