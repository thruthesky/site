import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MyPagePage } from './my-page.page';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { MessageModalServiceModule } from '../../providers/message-send-modal/message-send-modal.service.module';

const routes: Routes = [
    {path: '', component: MyPagePage}
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        TranslatePipeModule,
        MaterialModule,
        MessageModalServiceModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        MyPagePage
    ],
    entryComponents: [
        MyPagePage
    ],
    bootstrap: [MyPagePage],
    schemas: []
})
export class MyPagePageModule {
}
