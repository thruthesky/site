import { NgModule } from '@angular/core';
import { AdminHomePage } from './home/admin-home.page';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PointRefundPage } from './point-refund/point-refund.page';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';
import { PointHistoryPage } from './point-history/point-history.page';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { AdminPaymentPage } from './payment/admin-payment.page';
import { UserInfoComponentModule } from '../../components/user-info/user-info.component.module';
import { UserPage } from './user/user.page';
import { SessionPage } from './session/session.page';
import { UserInfoPage } from './user-info/user-info.page';



const appRoutes: Array<Route> = [
    { path: 'point-refund', pathMatch: 'full', component: PointRefundPage },
    { path: 'point-history', pathMatch: 'full', component: PointHistoryPage },
    { path: 'payment', pathMatch: 'full', component: AdminPaymentPage },
    { path: 'session', pathMatch: 'full', component: SessionPage },
    { path: 'user', pathMatch: 'full', component: UserPage },
    { path: 'user-info/:ID', pathMatch: 'full', component: UserInfoPage },
    { path: '', pathMatch: 'full', component: AdminHomePage }
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
        UserInfoPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild( appRoutes ),
        TranslatePipeModule,
        UserInfoComponentModule
    ],
    entryComponents: [
        AdminHomePage,
        PointRefundPage,
        PointHistoryPage,
        AdminPaymentPage,
        UserPage,
        SessionPage,
        UserInfoPage
    ],
    bootstrap: [
        AdminHomePage
    ]
})
export class AdminPageModule {}
