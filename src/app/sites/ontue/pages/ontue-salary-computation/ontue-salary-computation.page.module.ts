import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OntueSalaryComputationPage } from './ontue-salary-computation.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';


const routes: Routes = [
    { path: '', component: OntueSalaryComputationPage }
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
        OntueSalaryComputationPage
    ],
    entryComponents: [
        OntueSalaryComputationPage
    ],
    bootstrap: [OntueSalaryComputationPage],
    schemas: []
})
export class OntueSalaryComputationPageModule { }
