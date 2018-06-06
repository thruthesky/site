import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { XapiFileUploadComponentModule } from '../../components/xapi-file-upload/xapi-file-upload.component.module';
import { LoaderSerivceModule } from '../../providers/loader/loader.service.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ConfirmModalModule } from '../../components/modal/confirm/confirm.modal.module';
import { ModalSerivceModule } from '../../providers/modal/modal.service.module';
import { ForumService } from '../../providers/forum.service';


const routes: Routes = [
    {path: '', component: RegisterPage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        XapiFileUploadComponentModule,
        LoaderSerivceModule,
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
