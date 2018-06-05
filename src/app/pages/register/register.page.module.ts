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
import { ConfirmModalModule } from '../../components/modal/confirm/confirm.modal.module';
import { HowToGetKakaotalkIDModalModule } from '../how-to-get-kakaotalk-id/how-to-get-kakaotalk-id.modal.module';
import { ModalSerivceModule } from '../../providers/modal/modal.service.module';
import { ForumService } from '../../providers/forum.service';


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
        HowToGetKakaotalkIDModalModule,
        MaterialModule,
        ConfirmModalModule,
        ModalSerivceModule
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
    providers: [ ForumService ],
    bootstrap: [RegisterPage],
    schemas: []
})
export class RegisterPageModule {
}
