import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OntueSessionEvaluatePage } from './ontue-session-evaluate.page';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';



const routes: Routes = [
    { path: '', component: OntueSessionEvaluatePage }
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
        OntueSessionEvaluatePage
    ],
    entryComponents: [
        OntueSessionEvaluatePage
    ],
    bootstrap: [OntueSessionEvaluatePage],
    schemas: []
})
export class OntueSessionEvaluatePageModule { }
