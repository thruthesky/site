import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app.material.module';

import { OntueMyCurriculumVitaePage } from './ontue-my-curriculum-vitae.page';
import { XapiFileUploadComponentModule } from '../../../../components/xapi-file-upload/xapi-file-upload.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';



const routes: Routes = [
    { path: '', component: OntueMyCurriculumVitaePage }
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
        OntueMyCurriculumVitaePage
    ],
    entryComponents: [
        OntueMyCurriculumVitaePage
    ],
    bootstrap: [OntueMyCurriculumVitaePage],
    schemas: []
})
export class OntueMyCurriculumVitaePageModule { }
