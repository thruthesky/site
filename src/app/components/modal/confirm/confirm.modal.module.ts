import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../app.material.module';
import { ConfirmModal } from './confirm.modal';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        ConfirmModal
    ],
    declarations: [
        ConfirmModal
    ],
    entryComponents: [
        ConfirmModal
    ],
    bootstrap: [ConfirmModal],
    schemas: []
})
export class ConfirmModalModule {
}
