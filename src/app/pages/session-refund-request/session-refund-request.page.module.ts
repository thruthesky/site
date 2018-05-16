import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SessionRefundRequestPage } from './session-refund-request.page';
import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';


const routes: Routes = [
    {path: '', component: SessionRefundRequestPage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        SessionRefundRequestPage
    ],
    entryComponents: [
        SessionRefundRequestPage
    ],
    bootstrap: [SessionRefundRequestPage],
    schemas: []
})
export class SessionRefundRequestPageModule {
}
