import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionRefundRejectPage } from './session-refund-reject.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';



const routes: Routes = [
    {path: '', component: SessionRefundRejectPage}
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
        SessionRefundRejectPage
    ],
    entryComponents: [
        SessionRefundRejectPage
    ],
    bootstrap: [SessionRefundRejectPage],
    schemas: []
})
export class SessionRefundRejectPageModule {
}
