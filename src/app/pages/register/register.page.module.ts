import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterPage } from './register.page';
import { XapiFileUploadComponentModule } from '../../components/xapi-file-upload/xapi-file-upload.component.module';
import { LoaderSerivceModule } from '../../providers/loader/loader.service.module';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';
import { ForumServiceModule } from '../../providers/forum/forum.service.module';


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
        ModalServiceModule,
        ForumServiceModule
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
    providers: [],
    bootstrap: [RegisterPage],
    schemas: []
})
export class RegisterPageModule {
}
