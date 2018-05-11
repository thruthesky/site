import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueSessionEvaluatePage } from './ontue-session-evaluate.page';



const routes: Routes = [
    { path: '', component: OntueSessionEvaluatePage }
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
        OntueSessionEvaluatePage
    ],
    entryComponents: [
        OntueSessionEvaluatePage
    ],
    bootstrap: [OntueSessionEvaluatePage],
    schemas: []
})
export class OntueSessionEvaluatePageModule { }
