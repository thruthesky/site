import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../../../modules/firelibrary/pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';
import { OntueCurriculumVitaePage } from './ontue-curriculum-vitae.page';
import {XapiFileUploadComponentModule} from "../../../../components/xapi-file-upload/xapi-file-upload.component.module";


const routes: Routes = [
    { path: '', component: OntueCurriculumVitaePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
        XapiFileUploadComponentModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueCurriculumVitaePage
    ],
    entryComponents: [
        OntueCurriculumVitaePage
    ],
    bootstrap: [OntueCurriculumVitaePage],
    schemas: []
})
export class OntueCurriculumVitaePageModule { }
