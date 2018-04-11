import { NgModule } from '@angular/core';
import { XapiFileUploadComponent } from './xapi-file-upload.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@NgModule({
    declarations: [
        XapiFileUploadComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        XapiFileUploadComponent
    ]
})
export class XapiFileUploadComponentModule { }
