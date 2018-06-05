import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OntueMySchedulePage } from './ontue-my-schedule.page';
import { ConfirmModalModule } from '../../../../components/modal/confirm/confirm.modal.module';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';


const routes: Routes = [
    { path: '', component: OntueMySchedulePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ConfirmModalModule,
        MaterialModule,
        TranslatePipeModule

    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueMySchedulePage
    ],
    entryComponents: [
        OntueMySchedulePage
    ],
    bootstrap: [OntueMySchedulePage],
    schemas: []
})
export class OntueMySchedulePageModule { }
