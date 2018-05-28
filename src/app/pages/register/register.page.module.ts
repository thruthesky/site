import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { XapiFileUploadComponentModule } from '../../components/xapi-file-upload/xapi-file-upload.component.module';
import { LoaderSerivceModule } from '../../providers/loader/loader.service.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { HowToGetQRMARKModalModule } from '../how-to-get-qrmark/how-to-get-qrmark.modal.module';
import { MaterialModule } from '../../app.material.module';


const routes: Routes = [
    {path: '', component: RegisterPage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        XapiFileUploadComponentModule,
        LoaderSerivceModule,
        HowToGetQRMARKModalModule,
        MaterialModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        RegisterPage
    ],
    entryComponents: [
        RegisterPage
    ],
    bootstrap: [RegisterPage],
    schemas: []
})
export class RegisterPageModule {
}
