import { NgModule } from '@angular/core';
import { KatalkEnglishPaymentResultPage } from './katalkenglish-payment-result.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';

const appRoutes: Array<Route> = [
    { component: KatalkEnglishPaymentResultPage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishPaymentResultPage
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule
    ],
    entryComponents: [
        KatalkEnglishPaymentResultPage
    ],
    bootstrap: [KatalkEnglishPaymentResultPage]
})
export class KatalkEnglishPaymentResultPageModule { }
