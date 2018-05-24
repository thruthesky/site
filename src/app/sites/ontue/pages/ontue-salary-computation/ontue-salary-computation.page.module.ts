import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { OntueSalaryComputationPage } from './ontue-salary-computation.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';



const routes: Routes = [
    { path: '', component: OntueSalaryComputationPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueSalaryComputationPage
    ],
    entryComponents: [
        OntueSalaryComputationPage
    ],
    bootstrap: [OntueSalaryComputationPage],
    schemas: []
})
export class OntueSalaryComputationPageModule { }
