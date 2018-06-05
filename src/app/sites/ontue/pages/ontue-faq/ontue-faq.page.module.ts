import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OntueFAQPage } from './ontue-faq.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';



const routes: Routes = [
    { path: '', component: OntueFAQPage }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        TranslatePipeModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        OntueFAQPage
    ],
    entryComponents: [
        OntueFAQPage
    ],
    bootstrap: [OntueFAQPage],
    schemas: []
})
export class OntueFAQPageModule { }
