import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HowToGetQRMARKPage } from './how-to-get-qrmark.page';
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
        HowToGetQRMARKPage,
        HowToGetQRMARKModal
    ],
    entryComponents: [
        HowToGetQRMARKPage,
        HowToGetQRMARKModal
    ],
    bootstrap: [HowToGetQRMARKPage],
    schemas: []
})
export class HowToGetQRMARKModalModule {
}
