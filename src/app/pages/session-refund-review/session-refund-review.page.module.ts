import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionRefundReviewPage } from './session-refund-review.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ModalSerivceModule } from '../../providers/modal/modal.service.module';

const routes: Routes = [
    {path: '', component: SessionRefundReviewPage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
        ModalSerivceModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        SessionRefundReviewPage
    ],
    entryComponents: [
        SessionRefundReviewPage
    ],
    bootstrap: [SessionRefundReviewPage],
    schemas: []
})
export class SessionRefundReviewPageModule {
}
