import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LmsInfoComponent } from './lms-info.component';
import { TranslatePipeModule } from '../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../app.material.module';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        TranslatePipeModule,
        MaterialModule
    ],
    declarations: [
        LmsInfoComponent
    ],
    exports: [
        RouterModule,
        LmsInfoComponent
    ],
    schemas: []
})
export class LmsInfoComponentModule {
}
