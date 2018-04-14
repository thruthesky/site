import { NgModule } from '@angular/core';
import { KatalkEnglishPaymentPage } from './katalkenglish-payment.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { FormsModule } from '@angular/forms';

const appRoutes: Array<Route> = [
    { component: KatalkEnglishPaymentPage, path: '', pathMatch: 'full' }
];
@NgModule({
    declarations: [
        KatalkEnglishPaymentPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild( appRoutes ),
        TranslatePipeModule
    ],
    entryComponents: [
        KatalkEnglishPaymentPage
    ],
    bootstrap: [ KatalkEnglishPaymentPage ]
})
export class KatalkEnglishPaymentPageModule {}

