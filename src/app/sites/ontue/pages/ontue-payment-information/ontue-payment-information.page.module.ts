import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntuePaymentInformationPage } from './ontue-payment-information.page';
import { MaterialModule } from '../../../../app.material.module';


const routes: Routes = [
    { path: '', component: OntuePaymentInformationPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
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
