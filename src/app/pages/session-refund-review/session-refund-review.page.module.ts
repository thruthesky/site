import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
// import { TranslatePipeModule } from '../../modules/firelibrary/pipes/translate/translate.pipe.module';
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
        IonicModule,
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
