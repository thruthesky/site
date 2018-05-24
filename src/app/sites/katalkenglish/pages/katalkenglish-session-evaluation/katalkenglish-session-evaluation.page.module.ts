import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { KatalkEnglishSessionEvaluationPage } from './katalkenglish-session-evaluation.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';

const routes: Routes = [
    { path: '', component: KatalkEnglishSessionEvaluationPage }
];

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        KatalkEnglishSessionEvaluationPage
    ],
    entryComponents: [
        KatalkEnglishSessionEvaluationPage
    ],
    bootstrap: [KatalkEnglishSessionEvaluationPage],
    schemas: []
})
export class KatalkEnglishSessionEvaluationPageModule { }
