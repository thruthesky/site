import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { KatalkEnglishInstanceSchedulePage } from './katalkenglish-instance-schedule.page';
import { TranslatePipeModule } from '../../../../pipes/translate/translate.pipe.module';
import { MaterialModule } from '../../../../app.material.module';

const appRoutes: Array<Route> = [
    { component: KatalkEnglishInstanceSchedulePage, path: '' }
];
@NgModule({
    declarations: [
        KatalkEnglishInstanceSchedulePage
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        TranslatePipeModule,
        MaterialModule
    ],
    entryComponents: [
        KatalkEnglishInstanceSchedulePage
    ],
    bootstrap: [KatalkEnglishInstanceSchedulePage]
})
export class KatalkEnglishInstanceSchedulePageModule { }
