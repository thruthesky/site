import { NgModule } from '@angular/core';
import { AdminHomePage } from './home/admin-home.page';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PointRefundPage } from './point-refund/point-refund.page';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { FormsModule } from '@angular/forms';
import { PointHistoryPage } from './point-history/point-history.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';


const appRoutes: Array<Route> = [
    { path: 'point-refund', pathMatch: 'full', component: PointRefundPage },
    { path: 'point-history', pathMatch: 'full', component: PointHistoryPage },
    { path: '', pathMatch: 'full', component: AdminHomePage }
];

@NgModule({
    declarations: [
        AdminHomePage,
        PointRefundPage,
        AdminHeaderComponent,
        PointHistoryPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild( appRoutes ),
        TranslatePipeModule
    ],
    entryComponents: [
        AdminHomePage,
        PointRefundPage,
        PointHistoryPage
    ],
    bootstrap: [
        AdminHomePage
    ]
})
export class AdminPageModule {}
