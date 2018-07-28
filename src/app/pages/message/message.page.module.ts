import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagePage } from './message.page';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { MessageModalServiceModule } from '../../providers/message-send-modal/message-send-modal.service.module';


const routes: Routes = [
    {path: '', component: MessagePage}
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
        MaterialModule,
        MessageModalServiceModule
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        MessagePage
    ],
    entryComponents: [
        MessagePage
    ],
    bootstrap: [MessagePage],
    schemas: []
})
export class MessagePageModule {
}
