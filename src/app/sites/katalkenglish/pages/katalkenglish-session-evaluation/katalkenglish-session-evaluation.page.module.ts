import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { KatalkEnglishSessionEvaluationPage } from './katalkenglish-session-evaluation.page';

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
