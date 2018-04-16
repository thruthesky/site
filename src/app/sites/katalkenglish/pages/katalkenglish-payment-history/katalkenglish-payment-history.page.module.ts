import { NgModule } from '@angular/core';
import { KatalkEnglishPaymentHistoryPage } from './katalkenglish-payment-history.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

const appRoutes: Array<Route> = [
    { component: KatalkEnglishPaymentHistoryPage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishPaymentHistoryPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule
    ],
    entryComponents: [
        KatalkEnglishPaymentHistoryPage
    ],
    bootstrap: [KatalkEnglishPaymentHistoryPage]
})
export class KatalkEnglishPaymentHistoryPageModule { }

