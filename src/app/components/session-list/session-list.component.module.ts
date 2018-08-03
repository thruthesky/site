import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionListComponent } from './session-list.component';
import { FormsModule } from '@angular/forms';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';
import { ModalServiceModule } from '../../providers/modal/modal.service.module';
import { MessageModalServiceModule } from '../../providers/message-send-modal/message-send-modal.service.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslatePipeModule,
        MaterialModule,
        ModalServiceModule,
        MessageModalServiceModule
    ],
    declarations: [
        SessionListComponent
    ],
    exports: [
        RouterModule,
        SessionListComponent
    ],
    schemas: []
})
export class SessionListComponentModule {
}
