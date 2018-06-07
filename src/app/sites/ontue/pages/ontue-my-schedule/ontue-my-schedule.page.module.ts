import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OntueMySchedulePage } from './ontue-my-schedule.page';
import { MaterialModule } from '../../../../app.material.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { ModalSerivceModule } from '../../../../providers/modal/modal.service.module';


const routes: Routes = [
    { path: '', component: OntueMySchedulePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MaterialModule,
        TranslatePipeModule,
        ModalSerivceModule
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
