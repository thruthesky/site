import { NgModule } from '@angular/core';
import { KatalkEnglishPaymentResultPage } from './katalkenglish-payment-result.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';


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
        TranslatePipeModule,
        MaterialModule
    ],
    entryComponents: [
        KatalkEnglishPaymentResultPage
    ],
    bootstrap: [KatalkEnglishPaymentResultPage]
})
export class KatalkEnglishPaymentResultPageModule { }
