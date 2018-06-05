import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OntuePaymentInformationPage } from './ontue-payment-information.page';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: OntuePaymentInformationPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntuePaymentInformationPage
    ],
    entryComponents: [
        OntuePaymentInformationPage
    ],
    bootstrap: [OntuePaymentInformationPage],
    schemas: []
})
export class OntuePaymentInformationPageModule { }
