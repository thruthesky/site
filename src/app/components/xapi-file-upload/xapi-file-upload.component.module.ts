import { NgModule } from '@angular/core';
import { XapiFileUploadComponent } from './xapi-file-upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        XapiFileUploadComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        XapiFileUploadComponent
    ]
})
export class XapiFileUploadComponentModule { }
