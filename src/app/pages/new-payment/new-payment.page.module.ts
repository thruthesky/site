import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';

import { NewPaymentPage } from './new-payment.page';


const appRoutes: Array<Route> = [
    { component: NewPaymentPage, path: '', pathMatch: 'full' }
];
@NgModule({
    declarations: [
        NewPaymentPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild( appRoutes ),
        TranslatePipeModule,
        MaterialModule
    ],
    entryComponents: [
        NewPaymentPage
    ],
    bootstrap: [ NewPaymentPage ]
})
export class NewPaymentPageModule {}

