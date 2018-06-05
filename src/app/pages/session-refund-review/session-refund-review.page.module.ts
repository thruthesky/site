import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionRefundReviewPage } from './session-refund-review.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';



const routes: Routes = [
    {path: '', component: SessionRefundReviewPage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule
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
