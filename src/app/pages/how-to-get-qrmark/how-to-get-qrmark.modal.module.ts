import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HowToGetQRMARKModal } from './how-to-get-qrmark.modal';
import { MaterialModule } from '../../app.material.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaterialModule
    ],
    exports: [
        HowToGetQRMARKModal
    ],
    declarations: [
        HowToGetQRMARKModal
    ],
    entryComponents: [
        HowToGetQRMARKModal
    ],
    bootstrap: [HowToGetQRMARKModal],
    schemas: []
})
export class HowToGetQRMARKModalModule {
}
