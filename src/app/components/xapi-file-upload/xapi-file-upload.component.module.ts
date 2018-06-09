import { NgModule } from '@angular/core';
import { XapiFileUploadComponent } from './xapi-file-upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.material.module';


@NgModule({
    declarations: [
        XapiFileUploadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        XapiFileUploadComponent
    ]
})
export class XapiFileUploadComponentModule { }
