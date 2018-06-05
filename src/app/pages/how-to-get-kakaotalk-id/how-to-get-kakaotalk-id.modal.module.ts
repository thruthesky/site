import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.material.module';
import { HowToGetkakaotalkIDModal } from './how-to-get-kakaotalk-id.modal';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        HowToGetkakaotalkIDModal
    ],
    declarations: [
        HowToGetkakaotalkIDModal
    ],
    entryComponents: [
        HowToGetkakaotalkIDModal
    ],
    bootstrap: [HowToGetkakaotalkIDModal],
    schemas: []
})
export class HowToGetKakaotalkIDModalModule {
}
