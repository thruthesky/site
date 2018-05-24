import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
// import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { OntueGradeConditionPage } from './ontue-grade-condition.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';



const routes: Routes = [
    { path: '', component: OntueGradeConditionPage }
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
        OntueGradeConditionPage
    ],
    entryComponents: [
        OntueGradeConditionPage
    ],
    bootstrap: [OntueGradeConditionPage],
    schemas: []
})
export class OntueGradeConditionPageModule { }
