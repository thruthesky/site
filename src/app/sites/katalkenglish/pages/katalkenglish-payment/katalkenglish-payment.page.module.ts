import { NgModule } from '@angular/core';
import { KatalkEnglishPaymentPage } from './katalkenglish-payment.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';


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
        TranslatePipeModule,
        MaterialModule
    ],
    entryComponents: [
        KatalkEnglishPaymentPage
    ],
    bootstrap: [ KatalkEnglishPaymentPage ]
})
export class KatalkEnglishPaymentPageModule {}

