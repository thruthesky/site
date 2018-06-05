import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../app.material.module';

import { OntueMyCurriculumVitaePage } from './ontue-my-curriculum-vitae.page';
import { XapiFileUploadComponentModule } from '../../../../components/xapi-file-upload/xapi-file-upload.component.module';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { LocationService } from '../../../../providers/location.service';



const routes: Routes = [
    { path: '', component: OntueMyCurriculumVitaePage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
    providers: [
        LocationService
    ],
    bootstrap: [OntueMyCurriculumVitaePage],
    schemas: []
})
export class OntueMyCurriculumVitaePageModule { }
